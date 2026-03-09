import { useState } from "react";
import { View } from "react-native";
import { useSearchProfiles } from "@/hooks/use-search-profiles";
import type { SearchResult } from "@/schemas/search.schema";
import { useDebounce } from "@/utils/use-debounce";
import { RelationshipRow } from "./relationship-row";
import { SearchBar } from "./search-bar";
import { ThemedText } from "./themed-text";

const FriendSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");

	// Debounce search term by 300ms
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const {
		data: searchResults,
		isLoading,
		error,
	} = useSearchProfiles(debouncedSearchTerm);

	console.log(searchResults);

	return (
		<View className="w-full ">
			<SearchBar value={searchTerm} onChangeText={setSearchTerm} />

			{isLoading && (
				<View className="text-center py-8 text-gray-500">
					<ThemedText variant="body">Searching...</ThemedText>
				</View>
			)}

			{error && (
				<View className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					<ThemedText variant="body">{error.message}</ThemedText>
				</View>
			)}

			{!isLoading &&
				!error &&
				(!searchResults || searchResults.length === 0) &&
				debouncedSearchTerm.length >= 2 && (
					<ThemedText variant="body" className="text-center py-8 text-gray-500">
						No users found matching {debouncedSearchTerm}
					</ThemedText>
				)}

			{!isLoading && searchResults && searchResults.length > 0 && (
				<View className="space-y-2">
					{searchResults.map((user: SearchResult) => (
						<RelationshipRow
							key={user.id}
							user={user}
							isPending={
								user.is_incoming
									? user.incoming_status === "pending"
									: user.outgoing_status === "pending"
							}
							isIncoming={user.is_incoming}
							isSearching={true}
						/>
					))}
				</View>
			)}
		</View>
	);
};

export { FriendSearch };
