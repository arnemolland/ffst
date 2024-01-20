"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { update } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { settingsSchema } from "@/lib/schemas/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { eq } from "drizzle-orm";
import { ErrorCode } from "./errors";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
	const user = await getCurrentUser();

	if (!user) {
		return { error: "Unauthorized", code: ErrorCode.UNAUTHORIZED };
	}

	const dbUser = await getUserById(user.id);

	if (!dbUser) {
		return { error: "Unauthorized", code: ErrorCode.UNAUTHORIZED };
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser && existingUser.id !== user.id) {
			return { error: "Email already in use!", code: ErrorCode.EMAIL_IN_USE };
		}

		const verificationToken = await generateVerificationToken(values.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);

		return { success: "Verification email sent!" };
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcrypt.compare(
			values.password,
			dbUser.password,
		);

		if (!passwordsMatch) {
			return { error: "Incorrect password!", code: ErrorCode.INVALID_PASSWORD };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	const updatedUser = (
		await db
			.update(users)
			.set({
				...values,
			})
			.where(eq(users.id, dbUser.id))
			.returning()
	)[0];

	update({
		user: {
			name: updatedUser.name,
			email: updatedUser.email,
			isTwoFactorEnabled: updatedUser.twoFactorEnabled,
			role: updatedUser.role as "user" | "admin",
		},
	});

	return { success: "Settings Updated!" };
};
