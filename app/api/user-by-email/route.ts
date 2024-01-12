import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// This is exposed as an API route as we need to access this data from the Next.js middleware
// which is using the edge runtime, making it incompatible with the `postgres` package which required Node.
export async function GET(req: NextRequest) {
	const email = req.nextUrl.searchParams.get("email");

	if (!email) {
		return new NextResponse(null, { status: 400 });
	}

	const user = await (await import("@/lib/db")).getUserByEmail(email);

	if (!user) {
		return new NextResponse(null, { status: 404 });
	}

	return new NextResponse(JSON.stringify(user), { status: 200 });
}
