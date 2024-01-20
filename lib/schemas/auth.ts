import { z } from "zod";

export const userRole = z.enum(["admin", "user"]);

export type UserRole = z.infer<typeof userRole>;

export const settingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: userRole,
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}

			return true;
		},
		{
			message: "New password is required!",
			path: ["newPassword"],
		},
	)
	.refine(
		(data) => {
			if (data.newPassword && !data.password) {
				return false;
			}

			return true;
		},
		{
			message: "Password is required!",
			path: ["password"],
		},
	);

export const newPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum of 6 characters required",
	}),
});

export const resetSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
});

export const authSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
	code: z.optional(z.string()),
});

export const userAuthSchema = z.object({
	email: z.string().email(),
});

export const registerSchema = z.object({
	name: z.string().min(1, {
		message: "Name is required",
	}),
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(6, {
		message: "Minimum of 6 characters required",
	}),
});
