import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import {
	Draggable,
	DropProvider,
	type DropProviderRef,
	type DroppedItemsMap,
} from "react-native-reanimated-dnd";
import { DroppableBackground } from "@/components/dnd/droppable-background";
import EventCardDragOverlay from "@/components/dnd/event-card-drag-overlay";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { EventCard } from "@/components/layout/event-card";
import { ScreenHeader } from "@/components/layout/screen-header";
import { CreateEventButton } from "@/components/ui/create-event-button";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useDraggableProgress } from "@/hooks/use-draggable-progress";
import { useEvents } from "@/hooks/use-events";

const EventsScreen = () => {
	const { userId } = useAuthenticatedUser();
	const {
		data: { current, past },
	} = useEvents(userId);

	const dropProviderRef = useRef<DropProviderRef>(null);
	const [droppedItemsMap, setDroppedItemsMap] = useState<DroppedItemsMap>({});
	const { onDragging, animatedStyle } = useDraggableProgress();

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
				<View className="flex-1 w-full items-center relative">
					{current?.map((event) => (
						<Draggable
							style={{
								position: "absolute",
								top: 30,
								left: 30,
								right: 30,
								bottom: 30,
								margin: "auto",
							}}
							key={event.id}
							draggableId={event.id}
							data={{
								id: event.id,
								label: event.title,
							}}
							collisionAlgorithm="center"
							onDragging={onDragging}
						>
							<View className="w-full h-full relative">
								{/* Overlay on top of card */}
								<EventCardDragOverlay animatedStyle={animatedStyle} />

								{/* Event card itself */}
								<EventCard
									eventName={event.title}
									hostName={event.creator.first_name}
									hostAvatarUrl={event.creator.avatar_url ?? ""}
									startTime={event.start_time}
									endTime={event.end_time}
									location={event.location}
									isPrivate={event.is_private}
								/>
							</View>
						</Draggable>
					))}
				</View>
			</ContentSafeArea>
			<DroppableBackground />
		</DropProvider>
	);
};

export default EventsScreen;
