import { ResetForm } from "@/components/auth/reset-form";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ResetPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-4 top-4 md:left-8 md:top-8",
				)}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<Icons.logo className="mx-auto h-6 w-6" />
					<h1 className="text-2xl font-semibold tracking-tight">
						Forgotten something?
					</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email to send a password reset link
					</p>
				</div>
				<ResetForm />
				<p className="px-8 text-center text-sm text-muted-foreground">
					<Link
						href="/login"
						className="hover:text-brand underline underline-offset-4"
					>
						Remember your password after all? Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
