"use client";

import * as React from "react";

import { useMounted } from "@/hooks/use-mounted";
import { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
	toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
	const itemIds = React.useMemo(
		() =>
			toc.items
				? toc.items
						.flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
						.flat()
						.filter(Boolean)
						.map((id) => id?.split("#")[1])
				: [],
		[toc],
	);
	const activeHeading = useActiveItem(itemIds);
	const mounted = useMounted();

	if (!toc?.items) {
		return null;
	}

	return mounted ? (
		<div className="space-y-2">
			<p className="font-medium">On This Page</p>
			<Tree tree={toc} activeItem={activeHeading} />
		</div>
	) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
	const [activeId, setActiveId] = React.useState<string>("");

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "0% 0% -80% 0%" },
		);

		for (let i = 0; i < itemIds.length; i++) {
			const id = itemIds[i];
			if (!id) {
				continue;
			}

			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds) {
				if (!id) {
					return;
				}

				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [itemIds]);

	return activeId;
}

interface TreeProps {
	tree: TableOfContents;
	level?: number;
	activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
	return tree?.items?.length && level < 3 ? (
		<ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
			{tree.items.map((item) => {
				return (
					<li key={item.title} className={cn("mt-0 pt-2")}>
						<a
							href={item.url}
							className={cn(
								"inline-block no-underline",
								item.url === `#${activeItem}`
									? "font-medium text-primary"
									: "text-sm text-muted-foreground",
							)}
						>
							{item.title}
						</a>
						{item.items?.length ? (
							<Tree tree={item} level={level + 1} activeItem={activeItem} />
						) : null}
					</li>
				);
			})}
		</ul>
	) : null;
}
