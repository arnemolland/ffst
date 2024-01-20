"use server";

import { db } from "@/db";
import {
	accounts,
	passwordResetTokens,
	subscriptions,
	twoFactorConfirmations,
	twoFactorTokens,
	users,
	verificationTokens,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAccountByUserId(userId: string) {
	try {
		const account = await db.query.accounts.findFirst({
			where: eq(accounts.userId, userId),
		});

		return account;
	} catch {
		return null;
	}
}

export async function getPasswordResetTokenByToken(token: string) {
	try {
		const passwordResetToken = await db.query.passwordResetTokens.findFirst({
			where: eq(passwordResetTokens.token, token),
		});

		return passwordResetToken;
	} catch {
		return null;
	}
}

export async function getPasswordResetTokenByEmail(email: string) {
	try {
		const passwordResetToken = await db.query.passwordResetTokens.findFirst({
			where: eq(passwordResetTokens.email, email),
		});

		return passwordResetToken;
	} catch {
		return null;
	}
}

export async function getTwoFactorConfirmationByUserId(userId: string) {
	try {
		const twoFactorConfirmation =
			await db.query.twoFactorConfirmations.findFirst({
				where: eq(twoFactorConfirmations.userId, userId),
			});

		return twoFactorConfirmation;
	} catch {
		return null;
	}
}

export async function getTwoFactorTokenByToken(token: string) {
	try {
		const twoFactorToken = await db.query.twoFactorTokens.findFirst({
			where: eq(twoFactorTokens.token, token),
		});

		return twoFactorToken;
	} catch {
		return null;
	}
}

export async function getTwoFactorTokenByEmail(email: string) {
	try {
		const twoFactorToken = await db.query.twoFactorTokens.findFirst({
			where: eq(twoFactorTokens.email, email),
		});

		return twoFactorToken;
	} catch {
		return null;
	}
}

export async function getUserByEmail(email: string) {
	try {
		const user = await db.query.users.findFirst({
			where: eq(users.email, email),
		});

		return user;
	} catch {
		return null;
	}
}

export async function getUserById(id: string) {
	try {
		const user = await db.query.users.findFirst({
			where: eq(users.id, id),
		});

		return user;
	} catch {
		return null;
	}
}

export async function getVerificationTokenByToken(token: string) {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: eq(verificationTokens.token, token),
		});

		return verificationToken;
	} catch {
		return null;
	}
}

export async function getVerificationTokenByEmail(email: string) {
	try {
		const verificationToken = await db.query.verificationTokens.findFirst({
			where: eq(verificationTokens.email, email),
		});

		return verificationToken;
	} catch {
		return null;
	}
}

export async function getPlans() {
	try {
		const plans = await db.query.plans.findMany();

		return plans;
	} catch {
		return null;
	}
}

export async function getPlanById(id: string) {
	try {
		const plan = await db.query.plans.findFirst({
			where: eq(users.id, id),
		});

		return plan;
	} catch {
		return null;
	}
}

export async function getSubscriptionById(id: string) {
	try {
		const subscription = await db.query.subscriptions.findFirst({
			where: eq(users.id, id),
			with: {
				plan: true,
			},
			orderBy: desc(subscriptions.lemonSqueezyId),
		});

		return subscription;
	} catch {
		return null;
	}
}
