"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Plan, Subscription } from "@/db/schema";
import { cn, formatDate } from "@/lib/utils";
import React from "react";

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
	subscription: Subscription & {
		plan: Plan;
	};
}

export function BillingForm({
	subscription,
	className,
	...props
}: BillingFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event) {
		event.preventDefault();
		setIsLoading(!isLoading);

		// Get a LemonSqueezy session URL.
		const response = await fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				variantId: "TODO:variantId",
			}),
		});

		if (!response?.ok) {
			return toast({
				title: "Something went wrong.",
				description: "Please refresh the page and try again.",
				variant: "destructive",
			});
		}

		// Redirect to the Stripe session.
		// This could be a checkout page for initial upgrade.
		// Or portal to manage existing subscription.
		const session = await response.json();
		if (session) {
			window.location.href = session.url;
		}
	}

	return (
		<form className={cn(className)} onSubmit={onSubmit} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Subscription Plan</CardTitle>
					<CardDescription>
						You are currently on the <strong>{subscription.plan.name}</strong>{" "}
						plan.
					</CardDescription>
				</CardHeader>
				<CardContent>{subscription.plan.description}</CardContent>
				<CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
					<button
						type="submit"
						className={cn(buttonVariants())}
						disabled={isLoading}
					>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						{subscription.plan.price > 0 ? "Manage Subscription" : "Upgrade"}
					</button>
					{subscription.plan.price > 0 ? (
						<p className="rounded-full text-xs font-medium">
							{subscription.renewsAt
								? `Your plan renews on ${formatDate(subscription.renewsAt)}`
								: `Your plan will be canceled on ${formatDate(
										subscription.endsAt ?? "",
								  )}`}
						</p>
					) : null}
				</CardFooter>
			</Card>
		</form>
	);
}
