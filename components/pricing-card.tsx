import Link from "next/link";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
	name: string;
	price: string;
	features: string[];
	perTeam?: boolean;
}

export function PricingCard(props: PricingCardProps) {
	const { name, price, features, perTeam = true } = props;

	return (
		<div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
			<div className="grid gap-6">
				<h3 className="text-xl font-bold sm:text-2xl">{name}</h3>
				<ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
					{features.map((feature) => (
						<li className="flex items-center" key={feature}>
							<Icons.check className="mr-2 h-4 w-4" /> {feature}
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-col gap-4 text-center">
				<div className="flex flex-col items-center gap-1">
					{perTeam && (
						<p className="text-sm font-medium text-muted-foreground">From</p>
					)}
					<h4 className="text-5xl font-bold">{price}</h4>
					{perTeam && (
						<p className="text-sm font-medium text-muted-foreground">
							per project/month
						</p>
					)}
				</div>
				<Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
					Get Started
				</Link>
			</div>
		</div>
	);
}
