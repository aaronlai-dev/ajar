import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { userProfileSchema } from "@/schemas/relationship.schema";

// Schema for the raw Supabase response
const followerRowSchema = z.object({
	follower: userProfileSchema,
});

export async function getFollowers(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      profiles!relationships_follower_id_fkey (
        id,
        username,
        first_name,
        last_name,
        avatar_url
      )
    `)
		.eq("following_id", userId)
		.eq("status", "accepted");

	if (error) throw error;

	// Parse and flatten the data
	const followers = (data ?? []).map((row) => {
		const parsed = followerRowSchema.parse(row);
		return userProfileSchema.parse(parsed);
	});

	return followers;
}
