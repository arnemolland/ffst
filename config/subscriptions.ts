import { env } from "@/env";
import { SubscriptionPlan } from "types";

export const freePlan: SubscriptionPlan = {
	name: "Free",
	description:
		"The free plan is limited to 3 non-admin members. Upgrade to the team plan for more members.",
	stripePriceId: "",
	isPaid: false,
};

export const teamPlan: SubscriptionPlan = {
	name: "Team",
	description: "The team plan has 10 included non-admin members.",
	stripePriceId: env.STRIPE_TEAM_MONTHLY_PLAN_ID || "",
	isPaid: true,
};

export const businessPlan: SubscriptionPlan = {
	name: "Business",
	description: "The business plan has 20 included non-admin members.",
	stripePriceId: env.STRIPE_BUSINESS_MONTHLY_PLAN_ID || "",
	isPaid: true,
};

export const enterprisePlan: SubscriptionPlan = {
	name: "Enterprise",
	description:
		"The enterprise plan has a custom amount of included non-admin members.",
	stripePriceId: env.STRIPE_ENTERPRISE_MONTHLY_PLAN_ID || "",
	isPaid: true,
};
