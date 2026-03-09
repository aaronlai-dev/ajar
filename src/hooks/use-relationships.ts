// hooks/useRelationships.ts
import { useQuery } from "@tanstack/react-query";
import { getFollowers, getFollowing } from "@/api/get-relationships";

function useRelationships(userId: string) {
	const followersQuery = useQuery({
		queryKey: ["relationships", "followers", userId],
		queryFn: () => getFollowers(userId),
		enabled: !!userId,
	});

	const followingQuery = useQuery({
		queryKey: ["relationships", "following", userId],
		queryFn: () => getFollowing(userId),
		enabled: !!userId,
	});

	// Split into pending/accepted
	const followers = {
		pending: followersQuery.data?.filter((f) => f.status === "pending") ?? [],
		accepted: followersQuery.data?.filter((f) => f.status === "accepted") ?? [],
	};

	const following = {
		pending: followingQuery.data?.filter((f) => f.status === "pending") ?? [],
		accepted: followingQuery.data?.filter((f) => f.status === "accepted") ?? [],
	};

	return {
		followers,
		following,
		isLoading: followersQuery.isLoading || followingQuery.isLoading,
		isError: followersQuery.isError || followingQuery.isError,
		error: followersQuery.error || followingQuery.error,
		refetch: () => {
			followersQuery.refetch();
			followingQuery.refetch();
		},
	};
}

export { useRelationships };
