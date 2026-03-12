import { CaretLeftIcon } from "phosphor-react-native";
import { useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	StatusBar,
	View,
} from "react-native";
import { useSearchProfiles } from "@/hooks/use-search-profiles";
import type { SearchResult } from "@/schemas/search.schema";
import { useDebounce } from "@/utils/use-debounce";
import { RelationshipRow } from "./relationship-row";
import { SearchBar } from "./search-bar";
import { ThemedText } from "./themed-text";

const FriendSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const debouncedSearchTerm = useDebounce(searchTerm, 300);
	const {
		data: searchResults,
		isLoading,
		error,
	} = useSearchProfiles(debouncedSearchTerm);

	const handleFocus = () => setIsFocused(true);

	const handleCancel = () => {
		setIsFocused(false);
		setSearchTerm("");
	};

	return (
		<>
			{/* Default collapsed state */}
			<View className="w-full">
				<SearchBar
					value={searchTerm}
					onChangeText={setSearchTerm}
					onFocus={handleFocus}
				/>
			</View>

			{/* Expanded fullscreen modal */}
			<Modal
				visible={isFocused}
				animationType="fade"
				transparent={false}
				statusBarTranslucent
			>
				<StatusBar barStyle="dark-content" />
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1 bg-white"
				>
					{/* Header row with search + cancel */}
					<View className="flex-row items-center px-4 pt-14 pb-3 gap-3">
						<Pressable onPress={handleCancel}>
							<CaretLeftIcon size={20} weight="regular" />
						</Pressable>
						<View className="flex-1">
							<SearchBar
								value={searchTerm}
								onChangeText={setSearchTerm}
								autoFocus
							/>
						</View>
					</View>

					{/* Results */}
					<View className="flex-1 px-4">
						{isLoading && (
							<View className="py-8 items-center">
								<ThemedText variant="body" className="text-gray-500">
									Searching...
								</ThemedText>
							</View>
						)}

						{error && (
							<View className="bg-red-50 border border-red-200 px-4 py-3 rounded">
								<ThemedText variant="body" className="text-red-700">
									{error.message}
								</ThemedText>
							</View>
						)}

						{!isLoading &&
							!error &&
							(!searchResults || searchResults.length === 0) &&
							debouncedSearchTerm.length >= 2 && (
								<ThemedText
									variant="body"
									className="text-center py-8 text-gray-500"
								>
									No users found matching {debouncedSearchTerm}
								</ThemedText>
							)}

						{!isLoading && searchResults && searchResults.length > 0 && (
							<FlatList
								data={searchResults}
								keyExtractor={(item) => item.id}
								keyboardShouldPersistTaps="handled"
								renderItem={({ item }: { item: SearchResult }) => (
									<RelationshipRow
										user={item}
										isPending={
											item.is_incoming
												? item.incoming_status === "pending"
												: item.outgoing_status === "pending"
										}
										isIncoming={item.is_incoming}
										isSearching={true}
									/>
								)}
							/>
						)}
					</View>
				</KeyboardAvoidingView>
			</Modal>
		</>
	);
};

export { FriendSearch };
