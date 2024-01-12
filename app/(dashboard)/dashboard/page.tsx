import authOptions from "@/auth.config";

import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { TeamCreateButton } from "@/components/team-create-button";
import { TeamItem } from "@/components/team-item";
import { db } from "@/db";
import { getCurrentUser } from "@/lib/auth";
import { isNotNullOrUndefined } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect(authOptions?.pages?.signIn || "/login");
	}

	const teams = await db.query.teamMembers
		.findMany({
			where: eq(teamMembers.userId, user.id),
			with: {
				team: true,
			},
		})
		.then((memberships) =>
			memberships
				.map((membership) => membership.team)
				.filter(isNotNullOrUndefined),
		);

	return (
		<DashboardShell>
			<DashboardHeader heading="Teams" text="Create and manage teams.">
				<TeamCreateButton />
			</DashboardHeader>
			<div>
				{teams?.length ? (
					<div className="divide-y divide-border rounded-md border">
						{teams.map((team) => (
							<TeamItem key={team.id} team={team} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name="organization" />
						<EmptyPlaceholder.Title>No teams yet</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							You don&apos;t have any teams yet. Create one to get started!
						</EmptyPlaceholder.Description>
						<TeamCreateButton variant="outline" />
					</EmptyPlaceholder>
				)}
			</div>
		</DashboardShell>
	);
}
