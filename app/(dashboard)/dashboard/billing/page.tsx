import authOptions from "@/auth.config";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import { BillingForm } from "@/components/billing-form";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getBillingAccountSubscriptionPlan } from "@/lib/subscription";

import { NoBillingAccount } from "./create-billing-account";

export const metadata: Metadata = {
	title: "Billing",
	description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect(authOptions?.pages?.signIn || "/login");
	}

	const subscriptionPlan = await getBillingAccountSubscriptionPlan(user.id);

	const hasBillingAccount = subscriptionPlan !== null;

	// If user has a paid plan, check cancel status on Stripe.
	let isCanceled = false;
	if (subscriptionPlan?.isPaid && subscriptionPlan?.stripeSubscriptionId) {
		const stripePlan = await stripe.subscriptions.retrieve(
			subscriptionPlan.stripeSubscriptionId,
		);
		isCanceled = stripePlan.cancel_at_period_end;
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Billing"
				text="Manage billing and your subscription plan."
			/>
			<div className="grid gap-8">
				<Alert className="!pl-8 py-4">
					<Icons.warning />
					<AlertTitle>This is not ready.</AlertTitle>
					<AlertDescription>
						While ffst is in alpha, all features are free. Once we&apos;ve
						launched, you&apos;ll be automatically transferred to our{" "}
						<a
							href={`${siteConfig.url}/pricing`}
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-8"
						>
							free plan
						</a>
						.
					</AlertDescription>
				</Alert>
				{hasBillingAccount ? (
					<BillingForm
						subscriptionPlan={{
							...subscriptionPlan,
							isCanceled,
						}}
					/>
				) : (
					<NoBillingAccount />
				)}
			</div>
		</DashboardShell>
	);
}
