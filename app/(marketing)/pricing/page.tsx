import { Metadata } from "next";

import { PricingCard } from "@/components/pricing-card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
	title: "Pricing",
};

// TODO: Make this page dynamic based on Lemon Squeezy pricing
export default function PricingPage() {
	return (
		<main>
			<section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
				<div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Simple, transparent pricing
					</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						Unlimited free users, pay-as-you-go for non-admin users and usage on
						all non-enterprise plans.
					</p>
				</div>
				<div className="grid w-full items-center gap-10">
					<PricingCard
						name="Team"
						features={[
							"10 non-admin users included",
							"Review changes (drafts) with 30 day history",
							"Custom domain",
							"Dashboard Analytics",
							"Premium Support",
							"Pay-as-you-go for higher usage",
						]}
						price="$99"
					/>
					<PricingCard
						name="Business"
						features={[
							"20 non-admin users included",
							"SAML SSO",
							"Advanced data management",
							"90-day historical retention",
							"High volume quota",
							"Realtime previews",
						]}
						price="$949"
					/>
					<PricingCard
						name="Enterprise"
						features={[
							"Custom # of users & roles",
							"SLA & 24/7 support",
							"Customer Success contract",
							"Custom historical retention",
							"Custom usage quota",
							"Content source maps",
						]}
						price="Custom"
						perTeam={false}
					/>
				</div>
			</section>
			<div className="h-fit w-full bg-muted">
				<section className="container flex flex-col gap-6 bg-muted py-8 md:max-w-[64rem] md:py-12 lg:py-24">
					<h3 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-4xl">
						Common questions answered
					</h3>
					<div className="flex flex-col items-start gap-4">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									How do your charge for users?
								</AccordionTrigger>
								<AccordionContent>
									We offer unlimited free admin users on all non-enterprise
									plans. Each non-enterprise plan also comes with default
									non-admin roles available for assignment and a set number of
									non-admin users included. If you need more non-admin users,
									you can purchase them for $15/user/month.
									<br />
									<br />
									<b>Free</b> - Access to Editor & Viewer roles. 3 non-admin
									users included.
									<br />
									<b>Team</b> - Access to Editor, Viewer, and Developer roles.
									10 non-admin users included.
									<br />
									<b>Business</b> - Access to Editor, Viewer, Developer, and
									Contributor roles. 20 non-admin users included.
									<br />
									<b>Enterprise</b> - Custom roles and user quotas.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									Can I change or extend my plan?
								</AccordionTrigger>
								<AccordionContent>
									Absolutely. You can switch plans and add or remove users
									anytime. When you make a change we&apos;ll update your invoice
									to reflect your new preference. We won&apos;t charge you for
									the switch.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									Is there a minimum contract period?
								</AccordionTrigger>
								<AccordionContent>
									No. You can cancel your subscription at any time. We list our
									prices per month but you&apos;re never locked into a minimum
									term.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>
			</div>
		</main>
	);
}
