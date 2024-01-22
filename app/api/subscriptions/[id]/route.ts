import { env } from "@/env";
import { getPlanById } from "@/lib/db";
import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";
import { NextRequest, NextResponse } from "next/server";

const ls = new LemonSqueezy(env.LEMONSQUEEZY_API_KEY);

type Args = {
	params: {
		id: number;
	};
};

export async function GET(_: NextRequest, { params }: Args) {
	/**
	 * Used by some buttons to get subscription update billing and customer portal URLs
	 */
	try {
		const subscription = await ls.getSubscription({ id: params.id });
		return NextResponse.json(
			{
				error: false,
				subscription: {
					update_billing_url:
						subscription.data.attributes.urls.update_payment_method,
					customer_portal_url:
						subscription.data.attributes.urls.customer_portal,
				},
			},
			{ status: 200 },
		);
	} catch (e) {
		return NextResponse.json(
			{ error: true, message: e.message },
			{ status: 400 },
		);
	}
}

export async function POST(request: NextRequest, { params }: Args) {
	const res = await request.json();

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let subscription: any;

	if (res.variantId && res.productId) {
		// Update plan
		try {
			subscription = await ls.updateSubscription({
				id: params.id,
				productId: res.productId,
				variantId: res.variantId,
			});
		} catch (e) {
			return NextResponse.json(
				{ error: true, message: e.message },
				{ status: 400 },
			);
		}
	} else if (res.action === "resume") {
		// Resume
		try {
			subscription = await ls.resumeSubscription({ id: params.id });
		} catch (e) {
			return NextResponse.json(
				{ error: true, message: e.message },
				{ status: 400 },
			);
		}
	} else if (res.action === "cancel") {
		// Cancel
		try {
			subscription = await ls.cancelSubscription({ id: params.id });
		} catch (e) {
			return NextResponse.json(
				{ error: true, message: e.message },
				{ status: 400 },
			);
		}
	} else if (res.action === "pause") {
		// Pause
		try {
			subscription = await ls.pauseSubscription({ id: params.id });
		} catch (e) {
			return NextResponse.json(
				{ error: true, message: e.message },
				{ status: 400 },
			);
		}
	} else if (res.action === "unpause") {
		// Unpause
		try {
			subscription = await ls.unpauseSubscription({ id: params.id });
		} catch (e) {
			return NextResponse.json(
				{ error: true, message: e.message },
				{ status: 400 },
			);
		}
	} else {
		// Missing data in request
		return NextResponse.json(
			{ error: true, message: "Valid data not found." },
			{ status: 400 },
		);
	}

	// Return values needed to refresh state in UI
	// DB will be updated in the background with webhooks

	// Get price
	const resp = await ls.getPrice({
		id: subscription.data.attributes.first_subscription_item.price_id,
	});
	const subItemPrice = resp.data.attributes.unit_price;

	// Return a filtered subscription object to the UI
	const sub = {
		product_id: subscription.data.attributes.product_id,
		variant_id: subscription.data.attributes.variant_id,
		status: subscription.data.attributes.status,
		trial_ends_at: subscription.data.attributes.trial_ends_at,
		renews_at: subscription.data.attributes.renews_at,
		ends_at: subscription.data.attributes.ends_at,
		resumes_at: subscription.data.attributes.resumes_at,
		plan: {},
		price: subItemPrice,
	};

	// Get plan's data
	const plan = await getPlanById(sub.variant_id);
	sub.plan = {
		interval: plan?.interval,
		name: plan?.variantName,
	};

	return NextResponse.json(
		{ error: false, subscription: sub },
		{ status: 200 },
	);
}
