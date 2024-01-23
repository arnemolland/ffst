"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newPassword } from "@/lib/actions/new-password";
import { newPasswordSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function NewPasswordForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [error, setError] = React.useState<string | undefined>("");
	const [success, setSuccess] = React.useState<string | undefined>("");
	const [isPending, startTransition] = React.useTransition();

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
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
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button disabled={isPending} type="submit" className="w-full">
					Reset password
				</Button>
			</form>
		</Form>
	);
}
