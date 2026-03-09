import { supabase } from "@/lib/supabase";

interface DeleteRelationshipParams {
	followerId: string;
	followingId: string;
}

async function DeleteRelationship({
	followerId,
	followingId,
}: DeleteRelationshipParams) {
	const { error } = await supabase
		.from("relationships")
		.delete()
		.match({ follower_id: followerId, following_id: followingId });

	if (error) {
		throw error;
	}
}

export { DeleteRelationship };
