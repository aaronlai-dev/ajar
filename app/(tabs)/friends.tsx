import { MagnifyingGlassIcon, XIcon } from "phosphor-react-native";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { ContentSafeArea } from "@/components/layout/content-safe-area";
import { RelationshipTabs } from "@/components/layout/relationship-tabs";
import { FriendSearchResults } from "@/components/ui/friend-search-results";
import { SearchBar } from "@/components/ui/search-bar";
import { AnimatedThemedBorder } from "@/components/ui/themed-border";
import { ThemedText } from "@/components/ui/themed-text";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { useRelationships } from "@/hooks/use-relationships";

const FriendsScreen = () => {
	const { userId } = useAuthenticatedUser();
	const [searchTerm, setSearchTerm] = useState("");

	const { followers, following, isLoading } = useRelationships(userId);

	const FULL_WIDTH = 300; // w-full minus any horizontal padding
	const HEADER_WIDTH = 312;
	const listOpacity = useSharedValue(1);
	const searchOpacity = useSharedValue(0);

	const width = useSharedValue(0);
	const isOpen = useRef(false);

	const listStyle = useAnimatedStyle(() => ({ opacity: listOpacity.value }));
	const searchStyle = useAnimatedStyle(() => ({
		opacity: searchOpacity.value,
	}));

	const titleWidth = useSharedValue(HEADER_WIDTH);

	const titleContainerStyle = useAnimatedStyle(() => ({
		width: titleWidth.value,
		opacity: listOpacity.value,
	}));

	const toggleSearch = () => {
		if (isOpen.current) {
			// Close search bar
			width.value = withTiming(0, {
				duration: 300,
				easing: Easing.out(Easing.cubic),
			});
			listOpacity.value = withTiming(1, { duration: 300 });
			searchOpacity.value = withTiming(0, { duration: 150 });
			isOpen.current = false;
			titleWidth.value = withTiming(HEADER_WIDTH, { duration: 300 });
		} else {
			// Open search bar
			width.value = withTiming(FULL_WIDTH, {
				duration: 300,
				easing: Easing.out(Easing.cubic),
			});
			listOpacity.value = withTiming(0, { duration: 150 });
			searchOpacity.value = withTiming(1, { duration: 300 });
			isOpen.current = true;
			titleWidth.value = withTiming(0, { duration: 300 });
		}
	};

	return (
		<ContentSafeArea>
			<View className="flex flex-row justify-between">
				<Animated.View
					style={titleContainerStyle}
					className="overflow-hidden h-10"
				>
					<ThemedText variant="h1">neighbours</ThemedText>
				</Animated.View>
				<AnimatedThemedBorder className="flex-1 flex flex-row h-10">
					<Animated.View style={searchStyle} className="flex-1">
						<View>
							<SearchBar
								value={searchTerm}
								onChangeText={setSearchTerm}
								autoFocus
							/>
						</View>
					</Animated.View>
					<Pressable onPress={toggleSearch}>
						<Animated.View
							style={listStyle}
							className="items-center justify-center"
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
			<View className="flex-1">
				<Animated.View style={[listStyle, { flex: 1 }]}>
					<RelationshipTabs followers={followers} following={following} />
				</Animated.View>
				<Animated.View
					style={[
						searchStyle,
						{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
					]}
				>
					<FriendSearchResults searchTerm={searchTerm} />
				</Animated.View>
			</View>
		</ContentSafeArea>
	);
};

export default FriendsScreen;
