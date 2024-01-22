import Link from "next/link";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default async function IndexPage() {
	return (
		<>
			<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<Link
						href={siteConfig.links.twitter}
						className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
						target="_blank"
					>
						Announcement coming soon
					</Link>
					<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
						Made for the modern stack
					</h1>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						We&apos;re building a modern SaaS template for the modern stack.
						Type-safe, blazingly fast and <i>dead simple</i>.
					</p>
					<div className="space-x-4">
						<Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
							Get Started
						</Link>
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
						>
							GitHub
						</Link>
					</div>
				</div>
			</section>
			<section
				id="features"
				className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
			>
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Features
					</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						This project is a template for quickly building a modern SaaS. It is
						based on the great work of shadcn&apos;s{" "}
						<Link
							href="https://github.com/shadcn/taxonomy"
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4"
						>
							Taxonomy
						</Link>{" "}
						and AntonioErdeljac&apos;s{" "}
						<Link
							href="https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide"
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4"
						>
							Auth.js example
						</Link>
						.
					</p>
				</div>
				<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
								<title>Next.js Logo</title>
								<path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
							</svg>
							<div className="space-y-2">
								<h3>Next.js 14</h3>
								<p className="text-sm text-muted-foreground">
									App directory, routing, layouts, loading UI, server actions
									and API routes.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
								<title>React logo</title>
								<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
							</svg>
							<div className="space-y-2">
								<h3>React 18</h3>
								<p className="text-sm">
									Server and Client Components. Hooks. Suspense.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg className="h-12 w-12 fill-current" viewBox="0 0 256 256">
								<title>PostgresQL Logo</title>
								<g>
									<g>
										<path d="M180.5,4.7c-4.3,0.7-8.6,1.4-12.8,2.1c0.2,0.1,0.4,0.2,0.6,0.3c4.8,3.6,10.7,5.8,15.5,9.2c13.7,10,28.2,28,32.2,47.1c1.8,8.4-1.4,21.3-2.7,28.6c-2.2,11.9,4.2,21.9,2.1,34.6c-0.9,5.4-6.1,18-4.5,19.4c0-0.2,0-0.4,0-0.6c3.7-3.7,5.6-9.6,8.4-14.3c11-18.9,18.9-41,24.4-65.3c2.1-9.2,3.9-24.9,0.3-33.7c-1.9-4.5-6.5-8.5-10.1-11.3C220,9.9,206,4.6,180.5,4.7z" />
										<path d="M131.9,7.4c-2.3,0.2-4.6,0.4-6.8,0.6c-4.3,1.2-8.6,2.4-12.8,3.6c-19.3,8.3-30.7,31.9-31.9,58.1c4.4-2.2,9.2-4.6,14.3-6c26.1-7.1,29.6,9.6,33.1,29.5c1.3,7.6,1.5,18.3-0.3,25.6c-1.6,6.2-4,11.7-6.3,17c-2,5.7-4,11.3-6,17c0.1,0,0.2,0,0.3,0c2.5-0.7,5,0.2,6.8,0.9c10.7,4.2,9.5,14.7,9.5,29.2c0,26.2-3.2,61.8,17.3,67.7c6.1,1.7,13.4-0.3,18.2-1.8c26-8,20.9-39,25.9-67c1.3-7.3-0.3-17.2,3-22.6c2.2-3.8,5.7-4.4,9.2-6.8c-10.9-16.9-22.9-35-29.2-56.3c-7.5-25.6,5.8-35.9,31-34.3C195.8,31.9,172.7,7.6,131.9,7.4z" />
										<path d="M55.3,8c-4.4,0.5-8.8,1-13.1,1.5C29.8,12.6,19.8,19.7,15,30.4c-14.6,33.2,6.1,95,17.3,121c3.8,8.8,11.1,26.1,20.6,28.3c4.9,1.2,7.8-2.5,9.8-4.5c7.3-8.4,14.7-16.7,22.1-25c-6.9-8.1-16.3-18-13.4-35.5c0.5-5.1,1-10.1,1.5-15.2c-0.2-9.2-0.4-18.5-0.6-27.7c4.4-28.7,7.6-38.4,21.8-56.9c0-0.1,0-0.2,0-0.3C81.9,12.5,70.6,8.2,55.3,8z" />
										<path d="M220.1,163.3c-4.3-0.8-7.2-3.3-11-3.9c-5.1,2.7-7.4,3.2-7.1,11.3c12.7,6.2,36.9-2.4,42.6-9.2C237.2,162.3,228.6,164.9,220.1,163.3z" />
										<path d="M116.7,160.3c-4.1,4.4-8.2,8.8-12.2,13.1c-5.3,3.4-13.9,4.6-20.6,6.3c0.1,0.2,0.2,0.4,0.3,0.6c14,4.9,25.6,3.8,35.5-4.5C124.6,171.7,126.9,160.7,116.7,160.3z" />
										<path d="M205.5,93.3c0.9-8,1.8-15.9,2.7-23.9c-9.9-0.4-20.1-0.8-24.2,5.4c-2.9,4.4-1.9,13.9-0.3,19.1c4,12.8,10.2,24,16.4,34.6c1.4,2.9,2.8,5.8,4.2,8.7c0.2-0.1,0.4-0.2,0.6-0.3c1.2-6.4,4-13.3,2.7-21.8C206.9,107.7,206.2,100.5,205.5,93.3z M193.7,83.2c-3.5-1-4.8-1.7-6.8-3.9c0.2-1.7,0.5-1.7,1.2-2.7c1.6-0.6,2.6-1.8,6.8-2.1c3,0.5,4,1,5.4,3C198.4,80.9,197,81.1,193.7,83.2z" />
										<path d="M113.1,72.4c-2.6-1.9-6.7-2.1-11.3-2.1c-3.8,1-7.5,2-11.3,3C87,75.1,83.5,77,80,78.9c0.2,7.4,0.4,14.9,0.6,22.3c-1.1,7.2-2.8,15.9-1.5,23.2c2.6,14.2,12.1,26.4,28.6,26.6c1.5-4.7,3-9.3,4.5-14c2.5-6.1,5.7-12,7.4-19.1C122.8,105.7,120.3,77.6,113.1,72.4z M112.9,82.4c-2.8,6.5-13.7,3.8-14-3.3c0.1-0.2,0.2-0.4,0.3-0.6c0.9-0.5,1.8-1,2.7-1.5c5.6-0.2,8.4,0.8,11.3,3C113.1,80.8,113,81.6,112.9,82.4z" />
									</g>
								</g>
							</svg>
							<div className="space-y-2">
								<h3>Database</h3>
								<p className="text-sm text-muted-foreground">
									ORM and migrations using Drizzle, running on Postgres.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
								<title>TailwindCSS Logo</title>
								<path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
							</svg>
							<div className="space-y-2">
								<h3>Components</h3>
								<p className="text-sm text-muted-foreground">
									UI components built using Radix UI and styled with Tailwind
									CSS.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								className="h-12 w-12 fill-current"
							>
								<title>Auth.js Logo</title>
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							</svg>
							<div className="space-y-2">
								<h3>Authentication</h3>
								<p className="text-sm text-muted-foreground">
									Authentication using NextAuth.js and middlewares.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
								<title>Lemonsqueezy logo</title>
								<path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
							</svg>
							<div className="space-y-2">
								<h3>Subscriptions</h3>
								<p className="text-sm text-muted-foreground">
									Free and paid subscriptions using Lemonsqueezy.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-auto text-center md:max-w-[58rem]">
					<p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						ffst also includes a blog and a full-featured documentation site
						built using Contentlayer and MDX.
					</p>
				</div>
			</section>
			<section id="open-source" className="container py-8 md:py-12 lg:py-24">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Proudly Open Source
					</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						The ffst template is open source and powered by open source
						software. The code is available on{" "}
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4"
						>
							GitHub
						</Link>
						.{" "}
					</p>
				</div>
			</section>
		</>
	);
}
