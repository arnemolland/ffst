import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		// This is optional because it's only used in development.
		// See https://next-auth.js.org/deployment.
		NEXTAUTH_URL: z.string().url().optional(),
		NEXTAUTH_SECRET: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		RESEND_API_KEY: z.string().min(1),
		STRIPE_API_KEY: z.string().min(1),
		STRIPE_WEBHOOK_SECRET: z.string().min(1),
		TINYBIRD_WORKSPACE_TOKEN: z.string().min(1),
		STRIPE_TEAM_MONTHLY_PLAN_ID: z.string().min(1),
		STRIPE_BUSINESS_MONTHLY_PLAN_ID: z.string().min(1),
		STRIPE_ENTERPRISE_MONTHLY_PLAN_ID: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().min(1),
	},
	runtimeEnv: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		STRIPE_API_KEY: process.env.STRIPE_API_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		TINYBIRD_WORKSPACE_TOKEN: process.env.TINYBIRD_WORKSPACE_TOKEN,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		STRIPE_TEAM_MONTHLY_PLAN_ID: process.env.STRIPE_TEAM_MONTHLY_PLAN_ID,
		STRIPE_BUSINESS_MONTHLY_PLAN_ID:
			process.env.STRIPE_BUSINESS_MONTHLY_PLAN_ID,
		STRIPE_ENTERPRISE_MONTHLY_PLAN_ID:
			process.env.STRIPE_ENTERPRISE_MONTHLY_PLAN_ID,
	},
});
