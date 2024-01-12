import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { TeamCreateButton } from "@/components/team-create-button";
import { TeamItem } from "@/components/team-item";

export default function DashboardLoading() {
	return (
		<DashboardShell>
			<DashboardHeader heading="Teams" text="Create and manage teams.">
				<TeamCreateButton />
			</DashboardHeader>
			<div className="divide-border-200 divide-y rounded-md border">
				<TeamItem.Skeleton />
				<TeamItem.Skeleton />
				<TeamItem.Skeleton />
				<TeamItem.Skeleton />
				<TeamItem.Skeleton />
			</div>
		</DashboardShell>
	);
}
