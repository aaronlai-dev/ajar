import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { EventCard } from "@/components/layout/event-card";
import { EventScreenHeader } from "@/components/layout/event-screen-header";

export default function EventsScreen() {
	return (
		<ContentSafeArea>
			<EventScreenHeader />
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
	);
}
