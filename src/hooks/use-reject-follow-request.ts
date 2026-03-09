import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteRelationship } from "@/api/delete-relationship";
import { useAuthenticatedUser } from "@/contexts/auth-context";

function useRejectFollowRequest() {
	const queryClient = useQueryClient();
	const { userId } = useAuthenticatedUser();

	return useMutation({
		mutationFn: (followRequestId: string) =>
			DeleteRelationship({ followerId: followRequestId, followingId: userId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["relationships"] });
		},
		onError: (error) => {
			console.error("Failed to reject follow request", error);
		},
	});
}

export { useRejectFollowRequest };
