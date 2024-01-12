import { DocsConfig } from "types";

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Guides",
			href: "/guides",
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs",
				},
				{
					title: "Creating teams",
					href: "/docs/creating-teams",
					disabled: true,
				},
				{
					title: "Creating locales",
					href: "/docs/access-controls",
					disabled: true,
				},
				{
					title: "Adding keys",
					href: "/docs/creating-keys",
					disabled: true,
				},
				{
					title: "Adding translations",
					href: "/docs/creating-translations",
					disabled: true,
				},
			],
		},
		{
			title: "Documentation",
			items: [
				{
					title: "Introduction",
					href: "/docs/documentation",
				},
				{
					title: "Creating",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Components",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Code Blocks",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Style Guide",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Search",
					href: "/docs/in-progress",
					disabled: true,
				},
			],
		},
		{
			title: "Assets",
			items: [
				{
					title: "Introduction",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "File Formats",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Translating Images",
					href: "/docs/in-progress",
					disabled: true,
				},
			],
		},
		{
			title: "Dashboard",
			items: [
				{
					title: "Introduction",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Analytics",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Access Controls",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Authentication",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "Settings",
					href: "/docs/in-progress",
					disabled: true,
				},
				{
					title: "API Keys",
					href: "/docs/in-progress",
					disabled: true,
				},
			],
		},
	],
};
