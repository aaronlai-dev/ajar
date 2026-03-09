import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteRelationship } from "@/api/delete-relationship";
import { useAuthenticatedUser } from "@/contexts/auth-context";

function useUnfollow() {
	const queryClient = useQueryClient();
	const { userId } = useAuthenticatedUser();

	return useMutation({
		mutationFn: (unfollowId: string) =>
			DeleteRelationship({ followerId: userId, followingId: unfollowId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["relationships"] });
		},
		onError: (error) => {
			console.error("Failed to unfollow", error);
		},
	});
}

export { useUnfollow };
