import { z } from "zod";

export const userProfileSchema = z.object({
	id: z.uuid(),
	username: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	avatar_url: z.string().nullable(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
