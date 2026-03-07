import { z } from "zod";

export const relationshipStatusSchema = z.enum(["pending", "accepted"]);

export const followerProfileSchema = z.object({
	id: z.uuid(),
	username: z.string(),
	avatar_url: z.string().nullable(),
});

export const relationshipWithProfileSchema = z.object({
	id: z.uuid(),
	follower_id: z.uuid(),
	following_id: z.uuid(),
	status: relationshipStatusSchema,
	created_at: z.string(),
	profile: followerProfileSchema,
});

export type RelationshipWithProfile = z.infer<
	typeof relationshipWithProfileSchema
>;
