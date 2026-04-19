import { useCallback } from "react";
import {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type Options = {
	maxDistance?: number; // px to reach full color
	colors?: [string, string];
};

function useDraggableProgress(options?: Options) {
	const { maxDistance = 200, colors = ["#ffffff", "#3b82f6"] } = options ?? {};

	const translateX = useSharedValue(0);

	const onDragging = useCallback(
		({ x, tx }: { x: number; tx: number }) => {
			translateX.value = x + tx;
		},
		[translateX],
	);

	const animatedStyle = useAnimatedStyle(() => {
		const progress = Math.min(Math.max(translateX.value / maxDistance, 0), 1);

		return {
			backgroundColor: interpolateColor(progress, [0, 1], colors),
			opacity: interpolate(progress, [0, 1], [0, 0.7]),
		};
	});

	return {
		onDragging,
		animatedStyle,
	};
}

export { useDraggableProgress };
