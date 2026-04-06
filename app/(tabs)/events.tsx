import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { EventCard } from "@/components/layout/event-card";
import { ScreenHeader } from "@/components/layout/screen-header";
import { CreateEventButton } from "@/components/ui/create-event-button";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useEvents } from "@/hooks/use-events";

const EventsScreen = () => {
	const { userId } = useAuthenticatedUser();
	const {
		data: { current, past },
	} = useEvents(userId);

	return (
		<ContentSafeArea>
			<ScreenHeader title="events">
				<CreateEventButton />
			</ScreenHeader>
			{current?.map((event) => (
				<EventCard
					key={event.id}
					eventName={event.title}
					hostName={event.creator.first_name}
					hostAvatarUrl={event.creator.avatar_url ?? ""}
					startTime={event.start_time}
					endTime={event.end_time}
				/>
			))}
		</ContentSafeArea>
	);
};

export default EventsScreen;
