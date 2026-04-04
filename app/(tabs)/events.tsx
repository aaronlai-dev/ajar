import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { EventCard } from "@/components/layout/event-card";
import { CreateEventButton } from "@/components/ui/create-event-button";
import { ThemedText } from "@/components/ui/themed-text";

export default function EventsScreen() {
	return (
		<>
			<ContentSafeArea>
				<ThemedText variant="h1">doors</ThemedText>
				<EventCard
					eventName="Event Name"
					hostName="Host Name"
					hostAvatarUrl=""
					coverImageUrl=""
					tags={["tag1", "tag2"]}
					status="upcoming"
					scheduledTime="12:30pm"
				/>
			</ContentSafeArea>
			<CreateEventButton />
		</>
	);
}
