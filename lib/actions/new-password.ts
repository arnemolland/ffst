"use server";

import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { getPasswordResetTokenByToken, getUserByEmail } from "@/lib/db";
import { newPasswordSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { ErrorCode } from "./errors";

export const newPassword = async (
	values: z.infer<typeof newPasswordSchema>,
	token?: string | null,
) => {
	if (!token) {
		return { error: "Missing token.", code: ErrorCode.INVALID_TOKEN };
	}

	const validatedFields = newPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!", code: ErrorCode.INVALID_FIELDS };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: "Invalid token!", code: ErrorCode.TOKEN_NOT_FOUND };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has expired!", code: ErrorCode.TOKEN_EXPIRED };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "Email does not exist!", code: ErrorCode.EMAIL_NOT_FOUND };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db
		.update(users)
		.set({
			password: hashedPassword,
		})
		.where(eq(users.id, existingUser.id));

	await db
		.delete(passwordResetTokens)
		.where(eq(passwordResetTokens.id, existingToken.id));

	return { success: "Password updated!" };
};
