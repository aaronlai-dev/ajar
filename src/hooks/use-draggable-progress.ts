import { useCallback } from "react";
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

type Options = {
	maxDistance?: number;
	leftColor?: string;
	rightColor?: string;
	neutralColor?: string;
};

function useDraggableProgress(options?: Options) {
	const {
		maxDistance = 180,
		leftColor = "#ef4444", // red
		rightColor = "#22c55e", // green
		neutralColor = "#ffffff",
	} = options ?? {};

	const translateX = useSharedValue(0);

	const onDragging = useCallback(
		({ tx }: { tx: number }) => {
			console.log(translateX.value);
			translateX.value = tx;
		},
		[translateX],
	);

	const animatedStyle = useAnimatedStyle(() => {
		const clamped = Math.max(
			Math.min(translateX.value, maxDistance),
			-maxDistance,
		);

		const intensity = Math.abs(clamped) / maxDistance;

		return {
			backgroundColor: interpolateColor(
				clamped,
				[-maxDistance, 0, maxDistance],
				[leftColor, neutralColor, rightColor],
			),
			opacity: intensity * 0.7,
			transform: [{ scale: 0.98 + intensity * 0.02 }],
		};
	});

	return {
		onDragging,
		animatedStyle,
	};
}

export { useDraggableProgress };
