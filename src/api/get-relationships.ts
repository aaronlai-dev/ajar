import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { userProfileSchema } from "@/schemas/profile.schema";

const relationshipRowSchema = z.object({
	user: userProfileSchema,
});

async function getFollowers(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      user:profiles!follower_id (
        id,
        username,
        first_name,
        last_name,
        avatar_url
      ),
      status
    `)
		.eq("following_id", userId);

	if (error) throw error;
	return data.map((row) => ({
		...relationshipRowSchema.parse(row).user,
		status: row.status,
	}));
}

async function getFollowing(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      user:profiles!following_id (
        id,
        username,
        first_name,
        last_name,
        avatar_url
      ),
      status
    `)
		.eq("follower_id", userId);

	if (error) throw error;
	return data.map((row) => ({
		...relationshipRowSchema.parse(row).user,
		status: row.status,
	}));
}

export { getFollowers, getFollowing };
