import { MagnifyingGlassIcon, XIcon } from "phosphor-react-native";
import { useRef } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { RelationshipTabs } from "@/components/layout/relationship-tabs";
import { FriendSearch } from "@/components/ui/friend-search";
import { AnimatedThemedBorder } from "@/components/ui/themed-border";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useRelationships } from "@/hooks/use-relationships";

const FriendsScreen = () => {
	const { userId } = useAuthenticatedUser();

	const { followers, following, isLoading } = useRelationships(userId);

	const ICON_SIZE = 40; // w-10 = 40px
	const FULL_WIDTH = 200; // w-full minus any horizontal padding
	const listOpacity = useSharedValue(1);
	const searchOpacity = useSharedValue(0);

	const width = useSharedValue(ICON_SIZE);
	const isOpen = useRef(false);

	const animatedStyle = useAnimatedStyle(() => ({
		width: width.value,
	}));
	const iconStyle = useAnimatedStyle(() => ({ opacity: listOpacity.value }));
	const searchStyle = useAnimatedStyle(() => ({
		opacity: searchOpacity.value,
	}));

	const toggleSearch = () => {
		if (isOpen.current) {
			// Close
			width.value = withTiming(ICON_SIZE, {
				duration: 300,
				easing: Easing.out(Easing.cubic),
			});
			listOpacity.value = withTiming(1, { duration: 300 });
			searchOpacity.value = withTiming(0, { duration: 150 });
			isOpen.current = false;
		} else {
			// Open
			width.value = withTiming(FULL_WIDTH, {
				duration: 300,
				easing: Easing.out(Easing.cubic),
			});
			listOpacity.value = withTiming(0, { duration: 150 });
			searchOpacity.value = withTiming(1, { duration: 300 });
			isOpen.current = true;
		}
	};

	return (
		<ContentSafeArea>
			<View className="flex flex-row justify-between">
				<ThemedText variant="h1">neighbours</ThemedText>
				<AnimatedThemedBorder style={animatedStyle}>
					<Pressable onPress={toggleSearch}>
						<Animated.View
							style={iconStyle}
							className="absolute items-center justify-center"
						>
							<MagnifyingGlassIcon size={20} weight="bold" />
						</Animated.View>
						<Animated.View
							style={searchStyle}
							className="absolute items-center justify-center"
						>
							<XIcon size={20} weight="bold" />
						</Animated.View>
					</Pressable>
				</AnimatedThemedBorder>
			</View>
			<FriendSearch />
			{isLoading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color="#3b82f6" />
				</View>
			) : (
				<RelationshipTabs followers={followers} following={following} />
			)}
		</ContentSafeArea>
	);
};

export default FriendsScreen;
