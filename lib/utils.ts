import { env } from "@/env";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function absoluteUrl(path: string) {
	return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function isNotNullOrUndefined<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}
