import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { userProfileSchema } from "@/schemas/relationship.schema";

const followerRowSchema = z.object({
	follower: userProfileSchema,
});

export async function getFollowers(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      follower:profiles!follower_id (
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

	const followers = (data ?? []).map((row) => {
		const parsed = followerRowSchema.parse(row);
		return parsed.follower;
	});

	return followers;
}
