import "@/styles/globals.css";

import { auth } from "@/auth";
import { Analytics } from "@/components/analytics";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontHeading = localFont({
	src: "../public/fonts/CalSans-SemiBold.woff2",
	variable: "--font-heading",
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	authors: {
		name: "Arne Molland",
		url: "molland.sh",
	},
	creator: "Arne Molland",
	openGraph: {
		type: "website",
		locale: "en_US",
		images: siteConfig.ogImage,
		url: siteConfig.url,
		title: siteConfig.name,
		siteName: siteConfig.name,
		description: siteConfig.description,
	},
	twitter: {
		creator: "@arnemolland",
		site: "@arnemolland",
		title: siteConfig.name,
		description: siteConfig.description,
		images: siteConfig.ogImage,
		card: "summary_large_image",
	},
	icons: {
		icon: "/favicon.svg",
		apple: "/favicon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased",
						fontSans.variable,
						fontHeading.variable,
					)}
				>
					<Toaster />
					<Analytics token={env.TINYBIRD_WORKSPACE_TOKEN} />
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						{children}
						<TailwindIndicator />
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
