import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { CreateEventButton } from "@/components/ui/create-event-button";
import { ThemedText } from "@/components/ui/themed-text";

export default function EventsScreen() {
	return (
		<>
			<ContentSafeArea>
				<ThemedText variant="h1">Events</ThemedText>
			</ContentSafeArea>
			<CreateEventButton />
		</>
	);
}
