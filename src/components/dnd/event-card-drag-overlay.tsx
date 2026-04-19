import type { StyleProp, ViewStyle } from "react-native";
import Animated, { type AnimatedStyle } from "react-native-reanimated";

interface EventCardDragOverlayProps {
	animatedStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const EventCardDragOverlay = ({ animatedStyle }: EventCardDragOverlayProps) => {
	return (
		<Animated.View
			pointerEvents="none"
			className="absolute inset-0 z-2"
			style={animatedStyle}
		/>
	);
};

export default EventCardDragOverlay;
