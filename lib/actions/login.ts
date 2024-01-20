"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";
import { db } from "@/db";
import { twoFactorConfirmations, twoFactorTokens } from "@/db/schema";
import {
	getTwoFactorConfirmationByUserId,
	getTwoFactorTokenByEmail,
	getUserByEmail,
} from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { authSchema } from "@/lib/schemas/auth";
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from "@/lib/tokens";
import { eq } from "drizzle-orm";
import { ErrorCode } from "./errors";

export const login = async (
	values: z.infer<typeof authSchema>,
	callbackUrl?: string | null,
) => {
	const validatedFields = authSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid fields, check your inputs.",
			code: ErrorCode.INVALID_FIELDS,
		};
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return {
			error: "Email does not exist. Did you mean to sign up?",
			code: ErrorCode.EMAIL_NOT_FOUND,
		};
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);

		return { success: "Confirmation email sent." };
	}

	if (existingUser.twoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken) {
				return { error: "Invalid code.", code: ErrorCode.INVALID_CODE };
			}

			if (twoFactorToken.token !== code) {
				return { error: "Invalid code.", code: ErrorCode.INVALID_CODE };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if (hasExpired) {
				return { error: "Code expired.", code: ErrorCode.CODE_EXPIRED };
			}

			await db
				.delete(twoFactorTokens)
				.where(eq(twoFactorTokens.id, twoFactorToken.id));

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id,
			);

			if (existingConfirmation) {
				await db
					.delete(twoFactorTokens)
					.where(eq(twoFactorTokens.id, existingConfirmation.id));
			}

			await db
				.insert(twoFactorConfirmations)
				.values({
					userId: existingUser.id,
				})
				.execute();
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

			return { twoFactor: true };
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						error: "Invalid credentials.",
						code: ErrorCode.INVALID_CREDENTIALS,
					};
				default:
					return {
						error: "Something went wrong..",
						code: ErrorCode.UNSPECIFIED,
					};
			}
		}

		throw error;
	}
};
