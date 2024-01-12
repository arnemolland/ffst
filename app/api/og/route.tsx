import { ImageResponse } from "@vercel/og";

import { ogImageSchema } from "@/lib/schemas/og";

export const runtime = "edge";

const interRegular = fetch(
	new URL("../../../assets/fonts/Inter-Regular.woff", import.meta.url),
).then((res) => res.arrayBuffer());

const interBold = fetch(
	new URL("../../../assets/fonts/Inter-Bold.woff", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
	try {
		const fontRegular = await interRegular;
		const fontBold = await interBold;

		const url = new URL(req.url);
		const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
		const heading =
			values.heading.length > 140
				? `${values.heading.substring(0, 140)}...`
				: values.heading;

		const { mode } = values;
		const paint = mode === "dark" ? "#fff" : "#000";

		const fontSize = heading.length > 100 ? "70px" : "100px";

		return new ImageResponse(
			<div
				tw="flex relative flex-col p-12 w-full h-full items-start"
				style={{
					color: paint,
					background:
						mode === "dark"
							? "linear-gradient(90deg, #000 0%, #111 100%)"
							: "white",
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={850}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					style={{
						position: "absolute",
						left: "80%",
						top: "85%",

						transform: "translate(-50%, -50%) rotate(-25deg)",
						opacity: 0.05,
						stroke: mode === "dark" ? "#fff" : "#000",
					}}
				>
					<title>ffst logo</title>
					<path d="M13 16a3 3 0 0 1 2.24 5M18 12h.01" />
					<path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
					<path d="M20 8.54V4a2 2 0 1 0-4 0v3M7.612 12.524a3 3 0 1 0-1.6 4.3" />
				</svg>
				<div tw="flex flex-col flex-1 py-10">
					<div
						tw="flex text-xl uppercase font-bold tracking-tight"
						style={{ fontFamily: "Inter", fontWeight: "regular" }}
					>
						{values.type}
					</div>
					<div
						tw="flex leading-[1.1] text-[80px] font-bold"
						style={{
							fontFamily: "Inter",
							fontWeight: "bold",
							marginLeft: "-3px",
							fontSize,
						}}
					>
						{heading}
					</div>
				</div>
				<div tw="flex items-center w-full justify-between">
					<div
						tw="flex text-xl"
						style={{ fontFamily: "Inter", fontWeight: "bold" }}
					>
						ffst.molland.sh
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inter",
						data: fontRegular,
						weight: 400,
						style: "normal",
					},
					{
						name: "Inter",
						data: fontBold,
						weight: 700,
						style: "normal",
					},
				],
			},
		);
	} catch (error) {
		console.log(error);
		return new Response("Failed to generate image", {
			status: 500,
		});
	}
}
