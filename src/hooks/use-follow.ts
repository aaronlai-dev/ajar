import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddRelationship } from "@/api/add-relationship";
import { useAuthenticatedUser } from "@/contexts/auth-context";

function useFollow() {
	const queryClient = useQueryClient();
	const { userId } = useAuthenticatedUser();

	return useMutation({
		mutationFn: (requestFollowId: string) =>
			AddRelationship({ followerId: userId, followingId: requestFollowId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["relationships"] });
		},
		onError: (error) => {
			console.error("Failed to request follow", error);
		},
	});
}

export { useFollow };
