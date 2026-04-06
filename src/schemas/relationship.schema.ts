import { z } from "zod";
import { userProfileSchema } from "./profile.schema";

export const relationshipStatusSchema = z.enum(["pending", "accepted"]);

export const relationshipWithProfileSchema = z.object({
	id: z.uuid(),
	follower_id: z.uuid(),
	following_id: z.uuid(),
	status: relationshipStatusSchema,
	created_at: z.string(),
	profile: userProfileSchema,
});

export type UserProfile = z.infer<typeof userProfileSchema>;

export type RelationshipWithProfile = z.infer<
	typeof relationshipWithProfileSchema
>;
