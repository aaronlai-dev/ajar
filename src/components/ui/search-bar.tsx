import { TextInput, View } from "react-native";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	onFocus?: () => void;
	autoFocus?: boolean;
}

const SearchBar = ({
	value,
	onChangeText,
	onFocus,
	autoFocus = false,
}: SearchBarProps) => {
	return (
		<View className="mr-2">
			<TextInput
				className=" bg-accent h-full"
				placeholder="Search for future neighbours!"
				value={value}
				onChangeText={onChangeText}
				returnKeyType="search"
				accessibilityLabel="Search"
				onFocus={onFocus}
				autoFocus={autoFocus}
			/>
		</View>
	);
};

export { SearchBar };
