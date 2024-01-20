"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByEmail } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { authSchema } from "@/lib/schemas/auth";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { ErrorCode } from "./errors";

export const register = async (values: z.infer<typeof authSchema>) => {
	const validatedFields = authSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid fields. Check your input.",
			code: ErrorCode.INVALID_FIELDS,
		};
	}

	const { email, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: "Email already in use.", code: ErrorCode.EMAIL_IN_USE };
	}

	await db.insert(users).values({
		email,
		password: hashedPassword,
		role: "user",
	});

	const verificationToken = await generateVerificationToken(email);

	try {
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);
		return { success: "Confirmation email sent." };
	} catch (e) {
		console.error(e);
		return {
			error: "Failed to send confirmation email.",
			code: ErrorCode.EMAIL_FAILED_TO_SEND,
		};
	}
};
