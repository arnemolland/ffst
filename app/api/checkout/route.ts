import { env } from "@/env";
import { getCurrentUser } from "@/lib/auth";
import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";
import { NextRequest, NextResponse } from "next/server";

const ls = new LemonSqueezy(env.LEMONSQUEEZY_API_KEY);

export async function POST(req: NextRequest) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json(
			{ error: true, message: "Not logged in." },
			{ status: 401 },
		);
	}

	const body = await req.json();

	if (!body.variantId) {
		return NextResponse.json(
			{ error: true, message: "No variant ID was provided." },
			{ status: 400 },
		);
	}

	// Customise the checkout experience
	// All the options: https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
	const attributes = {
		checkout_options: {
			embed: true,
			media: false,
			button_color: "#fde68a",
		},
		checkout_data: {
			email: user.email, // Displays in the checkout form
			custom: {
				user_id: user.id, // Sent in the background; visible in webhooks and API calls
			},
		},
		product_options: {
			enabled_variants: [body.variantId], // Only show the selected variant in the checkout
			redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/`,
			receipt_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/`,
			receipt_button_text: "Go to your account",
			receipt_thank_you_note: "Thank you for signing up to Lemonstand!",
		},
	};

	try {
		const checkout = await ls.createCheckout({
			storeId: env.LEMONSQUEEZY_STORE_ID,
			variantId: body.variantId,
			attributes,
		});

		return NextResponse.json(
			{ error: false, url: checkout.data.attributes.url },
			{ status: 200 },
		);
	} catch (e) {
		return NextResponse.json(
			{ error: true, message: e.message },
			{ status: 400 },
		);
	}
}
