import { useState } from "react";
import { Calendar, type DateType } from "@/components/form/calendar";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { CreateEventButton } from "@/components/ui/create-event-button";
import { ThemedText } from "@/components/ui/themed-text";

export default function EventsScreen() {
	const [date, setDate] = useState<DateType>();

	return (
		<>
			<ContentSafeArea>
				<ThemedText variant="h1">Events</ThemedText>
				<Calendar
					mode="single"
					date={date}
					onChange={({ date }) => {
						setDate(date);
					}}
					timePicker={true}
				/>
			</ContentSafeArea>
			<CreateEventButton />
		</>
	);
}
