import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { userProfileSchema } from "@/schemas/relationship.schema";

const followingRowSchema = z.object({
	following: userProfileSchema,
});

export async function getFollowing(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      following:profiles!following_id  (
        id,
        username,
        first_name,
        last_name,
        avatar_url
      )
    `)
		.eq("follower_id", userId)
		.eq("status", "accepted");

	if (error) throw error;

	const following = (data ?? []).map((row) => {
		const parsed = followingRowSchema.parse(row);
		return parsed.following;
	});

	return following;
}
