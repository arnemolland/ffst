"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Icons } from "@/components/icons";
import { newVerification } from "@/lib/actions/new-verification";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export function NewVerificationForm() {
	const [error, setError] = React.useState<string | undefined>();
	const [success, setSuccess] = React.useState<string | undefined>();

	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const onSubmit = React.useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError("No token. Did you copy the entire link?");
			return;
		}

		newVerification(token)
			.then((data) => {
				setSuccess(data.success);

				if (data.error) {
					toast(data.error);
				}
			})
			.catch(() => {
				toast("Something went wrong. Please try again.");
			});
	}, [token, success, error]);

	React.useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<div className="flex items-center w-full justify-center">
			{!success && !error && (
				<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
			)}
			<FormSuccess message={success} />
			{!success && <FormError message={error} />}
		</div>
	);
}
