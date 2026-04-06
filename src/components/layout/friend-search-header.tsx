// components/ui/search-header.tsx
import { MagnifyingGlassIcon, XIcon } from "phosphor-react-native";
import { Pressable, type TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { SearchBar } from "@/components/ui/search-bar";
import { AnimatedThemedBorder } from "@/components/ui/themed-border";
import { ThemedText } from "@/components/ui/themed-text";

type Props = {
	searchTerm: string;
	onSearchChange: (text: string) => void;
	onToggle: () => void;
	listStyle: object;
	searchStyle: object;
	titleContainerStyle: object;
	searchBarRef: React.RefObject<TextInput | null>;
};

const FriendSearchHeader = ({
	searchTerm,
	onSearchChange,
	onToggle,
	listStyle,
	searchStyle,
	titleContainerStyle,
	searchBarRef,
}: Props) => (
	<View className="flex flex-row justify-between">
		<Animated.View style={titleContainerStyle} className="overflow-hidden h-10">
			<ThemedText variant="h1">neighbours</ThemedText>
		</Animated.View>
		<AnimatedThemedBorder className="flex-1 flex flex-row h-10 w-10 p-2">
			<Animated.View style={searchStyle} className="flex-1">
				<SearchBar
					value={searchTerm}
					onChangeText={onSearchChange}
					ref={searchBarRef}
				/>
			</Animated.View>
			<Pressable onPress={onToggle}>
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
);

export { FriendSearchHeader };
