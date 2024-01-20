"use server";

import { z } from "zod";

import { getUserByEmail } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { resetSchema } from "@/lib/schemas/auth";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ErrorCode } from "./errors";

export const reset = async (values: z.infer<typeof resetSchema>) => {
	const validatedFields = resetSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid email!", code: ErrorCode.INVALID_FIELDS };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: "Email not found!", code: ErrorCode.EMAIL_NOT_FOUND };
	}

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token,
	);

	return { success: "Reset email sent!" };
};
