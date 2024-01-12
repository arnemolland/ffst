"use client";

import React from "react";

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
import { cn } from "@/lib/utils";

type NoBillingAccountProps = React.HTMLAttributes<HTMLFormElement>;

export function NoBillingAccount({
	className,
	onSubmit,
	...props
}: NoBillingAccountProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	return (
		<form className={cn(className)} onSubmit={onSubmit} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>No billing account(s)</CardTitle>
					<CardDescription>
						You don&apos;t have any billing accounts yet.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						Create a billing account to start a subscription plan for your team.
					</p>
				</CardContent>
				<CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
					<button
						type="submit"
						className={cn(buttonVariants())}
						disabled={isLoading || true} // TODO: Enable once billing is ready.
					>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Add payment method
					</button>
				</CardFooter>
			</Card>
		</form>
	);
}
