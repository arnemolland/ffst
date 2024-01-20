import { z } from "zod";

export const teamPatchSchema = z.object({
	name: z.string().min(3).max(128).optional(),
});
