import {
	ArrowCircleRightIcon,
	MagnifyingGlassIcon,
	TrashIcon,
} from "phosphor-react-native";
import { Keyboard, Pressable, TextInput, View } from "react-native";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
	return (
		<View className="flex-row w-full gap-2 align-center">
			<View className="flex-row flex-1 bg-accent-50 rounded-xl px-md py-2.5 gap-2 align-center">
				{/* Search icon */}
				<MagnifyingGlassIcon size={20} weight="regular" />

				{/* Search bar */}
				<TextInput
					className="flex-1"
					placeholder="Search for future neighbours!"
					value={value}
					onChangeText={onChangeText}
					returnKeyType="search"
					accessibilityLabel="Search"
				/>

				{/* Clear button */}
				{value && (
					<Pressable onPress={() => onChangeText("")}>
						<TrashIcon size={20} weight="regular" />
					</Pressable>
				)}
			</View>
			{value && (
				<Pressable onPress={Keyboard.dismiss} className="mx-2 py-2.5">
					<ArrowCircleRightIcon size={20} weight="regular" />
				</Pressable>
			)}
		</View>
	);
};

export { SearchBar };
