import authConfig from "@/auth.config";
import { BillingForm } from "@/components/billing-form";
import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/auth";
import { getSubscriptionWithPlanByTeamId } from "@/lib/subscription";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { NoBillingAccount } from "./create-billing-account";

export const metadata: Metadata = {
	title: "Billing",
	description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
	const user = await getCurrentUser();

	// TODO: Retrieve team from session.
	const teamId = "88ceb2dd-dff4-458a-b3e1-565b897c5e5b";

	if (!user) {
		redirect(authConfig?.pages?.signIn || "/login");
	}

	const subscription = await getSubscriptionWithPlanByTeamId(teamId);

	const hasBillingAccount = subscription !== null;

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Billing"
				text="Manage billing and your subscription plan."
			/>
			<div className="grid gap-8">
				<Alert className="!pl-14">
					<Icons.warning />
					<AlertTitle>This is not ready yet.</AlertTitle>
					<AlertDescription>
						While Pitbull is in alpha, all features are free. Once we&apos;ve
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
						subscription={{
							...subscription,
						}}
					/>
				) : (
					<NoBillingAccount />
				)}
			</div>
		</DashboardShell>
	);
}
