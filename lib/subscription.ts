import { billingAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";

import {
	businessPlan,
	enterprisePlan,
	freePlan,
	teamPlan,
} from "@/config/subscriptions";
import { db } from "@/db";
import { UserSubscriptionPlan } from "types";

export async function getBillingAccountSubscriptionPlan(
	billingAccountId: string,
): Promise<UserSubscriptionPlan | null> {
	const billingAccount = await db.query.billingAccounts.findFirst({
		where: eq(billingAccounts.id, billingAccountId),
	});

	if (!billingAccount) {
		return null;
	}

	// Check if user is on a paid plan.
	const isPaid =
		billingAccount.stripePriceId !== null &&
		(billingAccount.stripeCurrentPeriodEnd?.getTime() ?? 0) + 86_400_000 >
			Date.now();

	let plan = freePlan;
	if (isPaid) {
		switch (billingAccount.stripeSubscriptionId) {
			case teamPlan.stripePriceId:
				plan = teamPlan;
				break;
			case businessPlan.stripePriceId:
				plan = businessPlan;
				break;
			case enterprisePlan.stripePriceId:
				plan = enterprisePlan;
				break;
		}
	}

	return {
		...billingAccount,
		...plan,
		stripeCurrentPeriodEnd:
			billingAccount.stripeCurrentPeriodEnd?.getTime() ?? 0,
		isPaid,
		isPro: isPaid,
	};
}
