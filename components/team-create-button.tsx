"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/icons";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type TeamCreateButtonProps = ButtonProps;

export function TeamCreateButton({
	className,
	variant,
	...props
}: TeamCreateButtonProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onClick() {
		setIsLoading(true);

		const response = await fetch("/api/teams", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: "Untitled Team",
			}),
		});

		setIsLoading(false);

		if (!response?.ok) {
			return toast({
				title: "Something went wrong.",
				description: "Your team was not created. Please try again.",
				variant: "destructive",
			});
		}

		const team = await response.json();

		// This forces a cache invalidation.
		router.refresh();

		router.push(`/editor/${team.id}`);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				buttonVariants({ variant }),
				{
					"cursor-not-allowed opacity-60": isLoading,
				},
				className,
			)}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? (
				<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icons.add className="mr-2 h-4 w-4" />
			)}
			New team
		</button>
	);
}
