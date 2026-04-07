import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import {
	Draggable,
	DropProvider,
	type DropProviderRef,
	type DroppedItemsMap,
} from "react-native-reanimated-dnd";
import { DroppableBackground } from "@/components/dnd/droppable-background";
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

	const dropProviderRef = useRef<DropProviderRef>(null);
	const [droppedItemsMap, setDroppedItemsMap] = useState<DroppedItemsMap>({});

	const handleDroppedItemsUpdate = useCallback((items: DroppedItemsMap) => {
		setDroppedItemsMap(items);
	}, []);

	return (
		<DropProvider
			ref={dropProviderRef}
			onDroppedItemsUpdate={handleDroppedItemsUpdate}
		>
			<ContentSafeArea>
				<ScreenHeader title="events">
					<CreateEventButton />
				</ScreenHeader>
				<View className="flex w-full items-center">
					{current?.map((event) => (
						<Draggable
							key={event.id}
							draggableId={event.id}
							data={{
								id: event.id,
								label: event.title,
							}}
							collisionAlgorithm="center"
						>
							<EventCard
								eventName={event.title}
								hostName={event.creator.first_name}
								hostAvatarUrl={event.creator.avatar_url ?? ""}
								startTime={event.start_time}
								endTime={event.end_time}
							/>
						</Draggable>
					))}
				</View>
			</ContentSafeArea>
			<DroppableBackground />
		</DropProvider>
	);
};

export default EventsScreen;
