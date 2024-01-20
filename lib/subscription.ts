import { Plan, Subscription, subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export async function getSubscriptionWithPlan(subsriptionId: string): Promise<
	| (Subscription & {
			plan: Plan;
	  })
	| null
> {
	const subscription = await db.query.subscriptions.findFirst({
		where: eq(subscriptions.id, subsriptionId),
		with: {
			plan: true,
		},
	});

	if (!subscription) {
		return null;
	}

	return {
		...subscription,
	};
}
