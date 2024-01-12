"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Icons } from "@/components/icons";
import { newVerification } from "@/lib/actions/new-verification";
import { toast } from "sonner";

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
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

	useEffect(() => {
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
};
