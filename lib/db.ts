"use server";

import { db } from "@/db";
import {
	accounts,
	passwordResetTokens,
	twoFactorConfirmations,
	twoFactorTokens,
	users,
	verificationTokens,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAccountByUserId = async (userId: string) => {
	try {
		const account = await db.query.accounts.findFirst({
			where: eq(accounts.userId, userId),
		});

		return account;
	} catch {
		return null;
	}
};

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken = await db.query.passwordResetTokens.findFirst({
			where: eq(passwordResetTokens.token, token),
		});

		return passwordResetToken;
	} catch {
		return null;
	}
};

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordResetToken = await db.query.passwordResetTokens.findFirst({
			where: eq(passwordResetTokens.email, email),
		});

		return passwordResetToken;
	} catch {
		return null;
	}
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
	try {
		const twoFactorConfirmation =
			await db.query.twoFactorConfirmations.findFirst({
				where: eq(twoFactorConfirmations.userId, userId),
			});

		return twoFactorConfirmation;
	} catch {
		return null;
	}
};

export const getTwoFactorTokenByToken = async (token: string) => {
	try {
		const twoFactorToken = await db.query.twoFactorTokens.findFirst({
			where: eq(twoFactorTokens.token, token),
		});

		return twoFactorToken;
	} catch {
		return null;
	}
};

export const getTwoFactorTokenByEmail = async (email: string) => {
	try {
		const twoFactorToken = await db.query.twoFactorTokens.findFirst({
			where: eq(twoFactorTokens.email, email),
		});

		return twoFactorToken;
	} catch {
		return null;
	}
};

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		return user;
	} catch {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await db.query.users.findFirst({
			where: eq(users.id, id),
		});

		return user;
	} catch {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: eq(verificationTokens.token, token),
		});

		return verificationToken;
	} catch {
		return null;
	}
};

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: eq(verificationTokens.email, email),
		});

		return verificationToken;
	} catch {
		return null;
	}
};
