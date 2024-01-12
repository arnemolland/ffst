"use server";

import { getCurrentRole } from "@/lib/auth";

export const admin = async () => {
	const role = await getCurrentRole();

	if (role === "admin") {
		return { success: "Allowed Server Action!" };
	}

	return { error: "Forbidden Server Action!" };
};
