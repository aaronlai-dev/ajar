import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFollowRequest } from "@/api/accept-follow-request";
import { useAuthenticatedUser } from "@/contexts/auth-context";

function useAcceptFollowRequest() {
	const queryClient = useQueryClient();
	const { userId } = useAuthenticatedUser();

	const mutation = useMutation({
		mutationFn: (followRequestId: string) =>
			acceptFollowRequest({ userId, followRequestId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["relationships"] });
		},
	});

	return mutation;
}

export { useAcceptFollowRequest };
