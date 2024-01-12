"use server";

import crypto from "node:crypto";
import { db } from "@/db";
import { twoFactorTokens } from "@/db/schema";
import { getPasswordResetTokenByEmail } from "@/lib/db";
import { getTwoFactorTokenByEmail } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/lib/db";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

	const existingToken = await getTwoFactorTokenByEmail(email);

	if (existingToken) {
		await db
			.delete(twoFactorTokens)
			.where(eq(twoFactorTokens.id, existingToken.id));
	}

	const twoFactorToken = (
		await db
			.insert(twoFactorTokens)
			.values({
				email,
				token,
				expires,
			})
			.returning()
	)[0];

	return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);

	if (existingToken) {
		await db
			.delete(twoFactorTokens)
			.where(eq(twoFactorTokens.id, existingToken.id));
	}

	const passwordResetToken = (
		await db
			.insert(twoFactorTokens)
			.values({
				email,
				token,
				expires,
			})
			.returning()
	)[0];

	return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db
			.delete(twoFactorTokens)
			.where(eq(twoFactorTokens.id, existingToken.id));
	}

	const verficationToken = (
		await db
			.insert(twoFactorTokens)
			.values({
				email,
				token,
				expires,
			})
			.returning()
	)[0];

	return verficationToken;
};
