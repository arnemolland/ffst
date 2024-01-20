"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorCode } from "@/lib/actions/errors";
import { login } from "@/lib/actions/login";
import { register } from "@/lib/actions/register";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { authSchema } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
	action: "login" | "register";
}

export function UserAuthForm({
	className,
	action,
	...props
}: UserAuthFormProps) {
	const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";

	const [showTwoFactor, setShowTwoFactor] = React.useState(false);
	const [error, setError] = React.useState<string | undefined>("");
	const [success, setSuccess] = React.useState<string | undefined>("");
	const [isPending, startTransition] = React.useTransition();

	const form = useForm<z.infer<typeof authSchema>>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof authSchema>) {
		setError("");
		setSuccess("");

		if (action === "login") {
			startTransition(() => {
				login(values, callbackUrl)
					.then((data) => {
						if (data?.error) {
							form.reset();

							if (data.code === ErrorCode.EMAIL_NOT_FOUND) {
								toast("Email not found", {
									description: "Did you mean to sign up?",
									action: {
										label: "Register",
										onClick: () => {
											router.push("/register");
										},
									},
								});
							} else {
								toast(data.error);
							}
						}

						if (data?.success) {
							form.reset();
							setSuccess(data.success);
						}

						if (data?.twoFactor) {
							setShowTwoFactor(true);
						}
					})
					.catch(() => {
						toast("Something went wrong. Please try again.");
					});
			});
		}

		if (action === "register") {
			startTransition(() => {
				register(values).then((data) => {
					setError(data.error);
					setSuccess(data.success);
				});
			});
		}
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="123456"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													id="email"
													placeholder="name@example.com"
													type="email"
													autoCapitalize="none"
													autoComplete="email"
													autoCorrect="off"
													disabled={isPending || isGitHubLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="******"
													type="password"
												/>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href="/reset">Forgot password?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormError message={error || urlError} />
								<FormSuccess message={success} />
								<Button disabled={isPending} type="submit" className="w-full">
									{isPending && (
										<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
									)}
									{showTwoFactor ? "Confirm" : "Sign in"}
								</Button>
							</>
						)}
					</div>
				</form>
			</Form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<button
				type="button"
				className={cn(buttonVariants({ variant: "outline" }))}
				onClick={() => {
					setIsGitHubLoading(true);
					signIn("github", {
						callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
					});
				}}
				disabled={isPending || isGitHubLoading}
			>
				{isGitHubLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</button>
		</div>
	);
}
