import { useRef } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

const HEADER_WIDTH = 314; // TODO: Calculate this to work for all screens
const DURATION = { fast: 150, slow: 300 };

export const useSearchAnimation = () => {
	const isOpen = useRef(false);
	const listOpacity = useSharedValue(1);
	const searchOpacity = useSharedValue(0);
	const titleWidth = useSharedValue(HEADER_WIDTH);

	const toggle = () => {
		const opening = !isOpen.current;
		isOpen.current = opening;

		listOpacity.value = withTiming(opening ? 0 : 1, {
			duration: opening ? DURATION.fast : DURATION.slow,
		});
		searchOpacity.value = withTiming(opening ? 1 : 0, {
			duration: opening ? DURATION.slow : DURATION.fast,
		});
		titleWidth.value = withTiming(opening ? 0 : HEADER_WIDTH, {
			duration: DURATION.slow,
		});
	};

	const listStyle = useAnimatedStyle(() => ({ opacity: listOpacity.value }));
	const searchStyle = useAnimatedStyle(() => ({
		opacity: searchOpacity.value,
	}));
	const titleContainerStyle = useAnimatedStyle(() => ({
		width: titleWidth.value,
		opacity: listOpacity.value,
	}));

	return { toggle, listStyle, searchStyle, titleContainerStyle };
};
