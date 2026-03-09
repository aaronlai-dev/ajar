import { supabase } from "@/lib/supabase";

interface AddRelationshipParams {
	followerId: string;
	followingId: string;
}

async function AddRelationship({
	followerId,
	followingId,
}: AddRelationshipParams) {
	const { error } = await supabase.from("relationships").insert({
		follower_id: followerId,
		following_id: followingId,
		status: "pending",
	});

	if (error) {
		throw error;
	}
}

export { AddRelationship };
