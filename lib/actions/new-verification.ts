"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByEmail, getVerificationTokenByToken } from "@/lib/db";
import { eq } from "drizzle-orm";
import { ErrorCode } from "./errors";

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: "Token does not exist!", code: ErrorCode.TOKEN_NOT_FOUND };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has expired!", code: ErrorCode.TOKEN_EXPIRED };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "Email does not exist!", code: ErrorCode.EMAIL_NOT_FOUND };
	}

	await db
		.update(users)
		.set({
			emailVerified: new Date(),
			email: existingToken.email,
		})
		.where(eq(users.id, existingUser.id));

	await db.delete(users).where(eq(users.id, existingToken.id));

	return { success: "Email verified!" };
};
