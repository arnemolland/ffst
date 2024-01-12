import { Team } from "@/db/schema";
import Link from "next/link";

import { TeamOperations } from "@/components/team-operations";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

interface TeamItemProps {
	team: Pick<Team, "id" | "name" | "createdAt">;
}

export function TeamItem({ team }: TeamItemProps) {
	return (
		<div className="flex items-center justify-between p-4">
			<div className="grid gap-1">
				<Link
					href={`/editor/${team.id}`}
					className="font-semibold hover:underline"
				>
					{team.name}
				</Link>
				<div>
					<p className="text-sm text-muted-foreground">
						{formatDate(team.createdAt?.toDateString())}
					</p>
				</div>
			</div>
			<TeamOperations team={team} />
		</div>
	);
}

TeamItem.Skeleton = function PostItemSkeleton() {
	return (
		<div className="p-4">
			<div className="space-y-3">
				<Skeleton className="h-5 w-2/5" />
				<Skeleton className="h-4 w-4/5" />
			</div>
		</div>
	);
};
