import { MagnifyingGlassIcon } from "phosphor-react-native";
import { TextInput, View } from "react-native";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
	return (
		<View className="flex-row w-full bg-accent-50 rounded-xl px-md py-2.5 gap-2 align-center">
			<MagnifyingGlassIcon size={20} weight="regular" />

			<TextInput
				className="flex-1"
				placeholder="Search for future neighbours!"
				value={value}
				onChangeText={onChangeText}
				returnKeyType="search"
				accessibilityLabel="Search"
			/>
		</View>
	);
};

export { SearchBar };
