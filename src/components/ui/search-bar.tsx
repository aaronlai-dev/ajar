import { forwardRef } from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
	({ value, onChangeText }, ref) => {
		return (
			<View className="mr-2">
				<TextInput
					ref={ref}
					className="h-full"
					placeholder="Search for future neighbours!"
					value={value}
					onChangeText={onChangeText}
					returnKeyType="search"
					accessibilityLabel="Search"
				/>
			</View>
		);
	},
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
