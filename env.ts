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
		LEMONSQUEEZY_API_KEY: z.string().min(1),
		LEMONSQUEEZY_WEBHOOK_SECRET: z.string().min(1),
		LEMONSQUEEZY_STORE_ID: z.number(),
		TINYBIRD_WORKSPACE_TOKEN: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().min(1),
	},
	runtimeEnv: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
		LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
		LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID
			? parseInt(process.env.LEMONSQUEEZY_STORE_ID)
			: undefined,
		TINYBIRD_WORKSPACE_TOKEN: process.env.TINYBIRD_WORKSPACE_TOKEN,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
