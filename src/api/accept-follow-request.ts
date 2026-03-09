import { supabase } from "@/lib/supabase";

interface AcceptFollowRequestParams {
	userId: string;
	followRequestId: string;
}
async function acceptFollowRequest({
	userId,
	followRequestId,
}: AcceptFollowRequestParams) {
	const { error } = await supabase
		.from("relationships")
		.update({
			status: "accepted",
		})
		.match({ follower_id: followRequestId, following_id: userId });

	if (error) {
		throw error;
	}
}

export { acceptFollowRequest };
