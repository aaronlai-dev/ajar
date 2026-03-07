import { supabase } from "@/lib/supabase";

export async function getFollowing(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      following:profiles!relationships_following_id_fkey (
        id,
        username,
        avatar_url
      )
    `)
		.eq("follower_id", userId)
		.eq("status", "accepted");

	if (error) throw error;

	return data?.map((row) => row.following) ?? [];
}
