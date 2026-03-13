import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/api/create-event";
import type { CreateEventInput } from "@/schemas/event.schema";

export function useCreateEvent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateEventInput) => createEvent(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
		onError: (error) => {
			console.error("Failed to create event:", error);
		},
	});
}
