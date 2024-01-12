import { headers } from "next/headers";

export function getCurrentUrl() {
	const host = headers().get("host");
	const protocol = headers().get("x-forwarded-proto") ?? "http";

	return `${protocol}://${host}`;
}
