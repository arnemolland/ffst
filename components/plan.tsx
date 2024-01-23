"use client";

import { PlanButton } from "@/components/plan-button";
import { cn } from "@/lib/utils";
import React from "react";

type Interval = "month" | "year";

function createMarkup(html: string) {
	return { __html: html };
}

function formatPrice(price: number) {
	return price / 100;
}

function formatInterval(interval: Interval, intervalCount: number) {
	return intervalCount > 1 ? `${intervalCount} ${interval}s` : interval;
}

interface IntervalSwitcherProps {
	intervalValue: string;
	changeInterval: (interval: Interval) => void;
}

function IntervalSwitcher({
	intervalValue,
	changeInterval,
}: IntervalSwitcherProps) {
	return (
		<div className="mt-6 flex justify-center items-center gap-4 text-sm text-gray-500">
			<div data-plan-toggle="month">Monthly</div>
			<div>
				<label className="toggle relative inline-block">
					<input
						type="checkbox"
						checked={intervalValue === "year"}
						onChange={(e) =>
							changeInterval(e.target.checked ? "year" : "month")
						}
					/>
					<span className="slider absolute rounded-full bg-gray-300 shadow-md" />
				</label>
			</div>
			<div data-plan-toggle="year">Yearly</div>
		</div>
	);
}

interface PlanProps {
	plan: {
		variantName: string;
		description: string;
		price: number;
		interval: "month" | "year";
		intervalCount: number;
		variantId: string;
	};
	subscription?: {
		status: string;
		variantId: string;
	} | null;
	intervalValue: Interval;
	setSubscription: React.Dispatch<
		React.SetStateAction<{
			status: string;
			variantId: string;
		} | null>
	>;
}

function Plan({
	plan,
	subscription,
	intervalValue,
	setSubscription,
}: PlanProps) {
	return (
		<div
			className={cn(
				"flex flex-col p-4 rounded-md border-solid border-2 border-gray-200",
				plan.interval !== intervalValue ? " hidden" : "",
				subscription?.status !== "expired" &&
					subscription?.variantId === plan.variantId
					? " opacity-50"
					: "",
			)}
		>
			<div className="grow">
				<h1 className="font-bold text-lg mb-1">{plan.variantName}</h1>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<div dangerouslySetInnerHTML={createMarkup(plan.description)} />
				<div className="my-4">
					<span className="text-2xl">${formatPrice(plan.price)}</span>
					&nbsp;
					<span className="text-gray-500">
						/{formatInterval(plan.interval, plan.intervalCount)}
					</span>
				</div>
			</div>

			<div className="mt-4">
				<PlanButton
					plan={plan}
					subscription={subscription}
					setSubscription={setSubscription}
				/>
			</div>
		</div>
	);
}

declare global {
	interface Window {
		createLemonSqueezy: () => void;
	}
}

interface PlansProps {
	plans: {
		variantName: string;
		description: string;
		price: number;
		interval: Interval;
		intervalCount: number;
		variantId: string;
	}[];
	subscription?: {
		status: string;
		variantId: string;
	} | null;
	setSubscription: React.Dispatch<
		React.SetStateAction<{
			status?: string;
			variantId?: string;
		} | null>
	>;
}

export function Plans({ plans, subscription, setSubscription }: PlansProps) {
	const [intervalValue, setIntervalValue] = React.useState<Interval>("month");

	// Make sure Lemon.js is loaded
	React.useEffect(() => {
		window.createLemonSqueezy();
	}, []);

	return (
		<>
			<IntervalSwitcher
				intervalValue={intervalValue}
				changeInterval={setIntervalValue}
			/>

			<div className="mt-5 grid gap-6 sm:grid-cols-2">
				{plans?.map((plan) => (
					<Plan
						plan={plan}
						subscription={subscription}
						intervalValue={intervalValue}
						key={plan.variantId}
						setSubscription={setSubscription}
					/>
				))}
			</div>

			<p className="mt-8 text-gray-400 text-sm text-center">
				Payments are processed securely by Lemon Squeezy.
			</p>
		</>
	);
}
