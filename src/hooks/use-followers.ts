import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../api/getFollowers";

export function useFollowers(userId: string) {
	return useQuery({
		queryKey: ["followers", userId],
		queryFn: () => getFollowers(userId),
		enabled: !!userId,
	});
}
