import { supabase } from "@/lib/supabase";

export async function getFollowers(userId: string) {
	const { data, error } = await supabase
		.from("relationships")
		.select(`
      follower:profiles!relationships_follower_id_fkey (
        id,
        username,
        avatar_url
      )
    `)
		.eq("following_id", userId)
		.eq("status", "accepted");

	if (error) throw error;

	return data?.map((row) => row.follower) ?? [];
}
