import React from "react";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { SubscriptionComponent } from "@/components/subscription";
import { getCurrentUser } from "@/lib/auth";
import { getPlans, getSubscriptionById } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Billing",
	description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const plans = await getPlans();

	const sub = await getSubscriptionById(user?.id);

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Billing"
				text="Manage billing and your subscription plan."
			/>
			<SubscriptionComponent sub={sub} plans={plans} />
			<Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
		</DashboardShell>
	);
}
