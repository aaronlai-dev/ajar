import { useQuery } from "@tanstack/react-query";
import { getFollowingEvents } from "@/api/get-events";

function useEvents(userId: string) {
	const eventsQuery = useQuery({
		queryKey: ["events", userId],
		queryFn: () => getFollowingEvents(userId),
		enabled: !!userId,
	});

	return {
		isLoading: eventsQuery.isLoading,
		isError: eventsQuery.isError,
		error: eventsQuery.error,
		refetch: () => {
			eventsQuery.refetch();
		},
	};
}

export { useEvents };
