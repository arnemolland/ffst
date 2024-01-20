"use client";

import * as React from "react";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { settings } from "@/lib/actions/settings";
import { UserRole, settingsSchema } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { ExtendedUser } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
	user: Pick<
		ExtendedUser,
		"id" | "name" | "role" | "email" | "isTwoFactorEnabled" | "isOAuth"
	>;
}

type FormData = z.infer<typeof settingsSchema>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
	const { update } = useSession();
	const [isPending, startTransition] = React.useTransition();

	const form = useForm<FormData>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			password: undefined,
			newPassword: undefined,
			name: user.name || undefined,
			email: user.email || undefined,
			role: user.role as UserRole,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
		},
	});

	const onSubmit = (values: z.infer<typeof settingsSchema>) => {
		startTransition(() => {
			settings(values)
				.then((data) => {
					if (data.error) {
						toast("Error", {
							description: data.error,
						});
					}

					if (data.success) {
						update();
						toast("Settings saved", {
							description: "Your settings have been saved successfully.",
						});
					}
				})
				.catch(() => {
					toast("Error", {
						description: "An error occurred while saving your settings.",
					});
				});
		});
	};

	return (
		<Form {...form}>
			<form
				className={cn("space-y-6", className)}
				onSubmit={form.handleSubmit(onSubmit)}
				{...props}
			>
				<Card>
					<CardHeader>
						<CardTitle>Profile</CardTitle>
						<CardDescription>
							Please enter your full name or a display name you are comfortable
							with.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 w-[400px]">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="grid gap-1">
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="John Doe"
												size={32}
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
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
														placeholder="john.doe@example.com"
														type="email"
														disabled={isPending}
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
														placeholder="******"
														type="password"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="******"
														type="password"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="admin">Admin</SelectItem>
												<SelectItem value="user">User</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
								<FormField
									control={form.control}
									name="isTwoFactorEnabled"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
											<div className="space-y-0.5">
												<FormLabel>Two Factor Authentication</FormLabel>
												<FormDescription>
													Enable two factor authentication for your account
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													disabled={isPending}
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							)}
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className={className} disabled={isPending}>
							{isPending && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
							<span>Save</span>
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
