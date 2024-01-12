import authOptions from "@/auth.config";

import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
	title: "Settings",
	description: "Manage account and website settings.",
};

export default async function SettingsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect(authOptions?.pages?.signIn || "/login");
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<div className="grid gap-10">
				<UserNameForm user={user} />
			</div>
		</DashboardShell>
	);
}
