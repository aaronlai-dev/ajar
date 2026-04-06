import { useQuery } from "@tanstack/react-query";
import { getFollowingEvents } from "@/api/get-events";

function useEvents(userId: string) {
	const eventsQuery = useQuery({
		queryKey: ["events", userId],
		queryFn: () => getFollowingEvents(userId),
		enabled: !!userId,
		select: (data) => {
			const now = new Date();
			return {
				current: data.filter((event) => event.end_time > now),
				past: data.filter((event) => event.end_time <= now),
			};
		},
	});

	return {
		data: {
			current: eventsQuery.data?.current ?? [],
			past: eventsQuery.data?.past ?? [],
		},
		isLoading: eventsQuery.isLoading,
		isError: eventsQuery.isError,
		error: eventsQuery.error,
		refetch: () => {
			eventsQuery.refetch();
		},
	};
}

export { useEvents };
