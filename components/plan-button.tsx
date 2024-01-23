"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PlanButton({ plan, subscription, setSubscription }) {
	const [isMutating, setIsMutating] = React.useState(false);
	const router = useRouter();

	async function createCheckout(e, variantId) {
		e.preventDefault();

		setIsMutating(true);

		// Create a checkout
		const res = await fetch("/api/checkouts", {
			method: "POST",
			body: JSON.stringify({
				variantId: variantId,
			}),
		});
		const checkout = await res.json();
		if (checkout.error) {
			alert(checkout.message);
		} else {
			router.replace(checkout.url);
		}

		setIsMutating(false);
	}

	async function changePlan(e, subscription, plan) {
		e.preventDefault();

		if (
			confirm(`Please confirm you want to change to the ${plan.variantName} ${plan.interval}ly plan. \
For upgrades you will be charged a prorated amount.`)
		) {
			setIsMutating(true);

			// Send request
			const res = await fetch(`/api/subscriptions/${subscription.id}`, {
				method: "POST",
				body: JSON.stringify({
					variantId: plan.variantId,
					productId: plan.productId,
				}),
			});
			const result = await res.json();
			if (result.error) {
				toast.error(result.message);
			} else {
				setSubscription({
					...subscription,
					productId: result.subscription.product_id,
					variantId: result.subscription.variant_id,
					planName: result.subscription.plan.name,
					planInterval: result.subscription.plan.interval,
					status: result.subscription.status,
					renewalDate: result.subscription.renews_at,
					price: result.subscription.price,
				});

				toast.success("Your subscription plan has changed!");

				// Webhooks will update the DB in the background
			}

			setIsMutating(false);
		}
	}

	return (
		<>
			{!subscription || subscription.status === "expired" ? (
				<button
					type="button"
					onClick={(e) => createCheckout(e, plan.variantId)}
					className="block text-center py-2 px-5 bg-amber-200 rounded-full font-bold text-amber-800 shadow-md shadow-gray-300/30 select-none"
					disabled={isMutating}
				>
					<Loader2
						className={cn(
							"animate-spin inline-block relative top-[-1px] mr-2",
							!isMutating ? " hidden" : "",
						)}
					/>
					<span className="leading-[28px] inline-block">Sign up</span>
				</button>
			) : (
				<>
					{subscription?.variantId === plan.variantId ? (
						<span className="block text-center py-2 px-5 bg-gray-200 rounded-full font-bold shadow-md shadow-gray-300/30 select-none">
							<span className="leading-[28px] inline-block">
								Your current plan
							</span>
						</span>
					) : (
						<button
							type="button"
							onClick={(e) => changePlan(e, subscription, plan)}
							className="block text-center py-2 px-5 bg-amber-200 rounded-full font-bold text-amber-800 shadow-md shadow-gray-300/30 select-none"
							disabled={isMutating}
						>
							<Loader2
								className={cn(
									"animate-spin inline-block relative top-[-1px] mr-2",
									!isMutating ? " hidden" : "",
								)}
							/>
							<span
								className={cn(
									"leading-[28px] inline-block",
									isMutating ? " hidden" : "",
								)}
							>
								Change to this plan
							</span>
						</button>
					)}
				</>
			)}
		</>
	);
}
