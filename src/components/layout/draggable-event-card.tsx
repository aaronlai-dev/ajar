import { useContext, useEffect, useRef } from "react";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import {
	Draggable,
	DraggableState,
	SlotsContext,
} from "react-native-reanimated-dnd";
import { EventCard, type EventCardProps } from "./event-card";

interface DraggableEventCardProps extends EventCardProps {
	draggableId: string;
	onStateChange?: (id: string, state: DraggableState) => void;
	proximityRefs: React.MutableRefObject<Record<string, (v: number) => void>>;
}

const DraggableEventCard = ({
	draggableId,
	onStateChange,
	proximityRefs,
	...eventCardProps
}: DraggableEventCardProps) => {
	const context = useContext(SlotsContext);
	const proximity = useSharedValue(0); // 0 = far, 1 = over center
	const listenerId = useRef(`proximity-${draggableId}`);

	// Register an onDragging listener via the context
	useEffect(() => {
		if (!context) return;

		// onDragging fires on the context for ALL draggables, so filter by itemData.id
		context.registerPositionUpdateListener(listenerId.current, () => {
			// This is for layout re-measures, not position ticks — see note below
		});

		return () => context.unregisterPositionUpdateListener(listenerId.current);
	}, [context]);

	// In DraggableEventCard, accept proximityRefs as a prop:
	useEffect(() => {
		proximityRefs.current[eventCardProps.eventId] = (v) => {
			proximity.value = withTiming(v, { duration: 50 });
		};
		return () => {
			delete proximityRefs.current[eventCardProps.eventId];
		};
	}, [proximity, proximityRefs, eventCardProps.eventId]);

	const animatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			proximity.value,
			[0, 1],
			["#f9fafb", "#3b82f6"],
		),
	}));

	return (
		<Draggable
			style={{
				position: "absolute",
				top: 30,
				left: 30,
				right: 30,
				bottom: 30,
				margin: "auto",
			}}
			draggableId={draggableId}
			data={{ id: draggableId, label: eventCardProps.eventName }}
			collisionAlgorithm="center"
			onStateChange={(state) => {
				if (state === DraggableState.IDLE) {
					proximity.value = withTiming(0, { duration: 200 });
				}
				onStateChange(eventCardProps.eventId, state);
			}}
		>
			<Animated.View style={[{ flex: 1 }, animatedStyle]}>
				<EventCard {...eventCardProps} />
			</Animated.View>
		</Draggable>
	);
};

export { DraggableEventCard };
