import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { useSearchProfiles } from "@/hooks/use-search-profiles";
import { useDebounce } from "@/utils/use-debounce";
import { SearchBar } from "./search-bar";
import { ThemedText } from "./themed-text";

interface SearchResult {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	avatar_url: string;
	match_type: "exact" | "fuzzy";
	rank: number;
}

const FriendSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");

	// Debounce search term by 300ms
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const {
		data: searchResults,
		isLoading,
		error,
	} = useSearchProfiles(debouncedSearchTerm);

	const getDisplayName = (result: SearchResult) => {
		if (result.first_name || result.last_name) {
			return `${result.first_name || ""} ${result.last_name || ""}`.trim();
		}
		return result.username;
	};

	function handleAddFriend(userId: string) {
		console.log("handle add friend", userId);
	}

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
					<View className="text-center py-8 text-gray-500">
						No users found matching {debouncedSearchTerm}
					</View>
				)}

			{!isLoading && searchResults && searchResults.length > 0 && (
				<View className="space-y-2">
					{searchResults.map((user) => (
						<View
							key={user.id}
							className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
						>
							<View className="flex items-center gap-3">
								<View className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
									{user.avatar_url ? (
										<Image
											src={user.avatar_url}
											alt={user.username}
											className="w-full h-full object-cover"
										/>
									) : (
										<ThemedText
											variant="body"
											className="w-full h-full flex items-center justify-center text-gray-600 font-semibold"
										>
											{user.username}
										</ThemedText>
									)}
								</View>
								<View>
									<ThemedText variant="body">{getDisplayName(user)}</ThemedText>
									<ThemedText variant="body">{user.username}</ThemedText>
									{user.match_type === "fuzzy" && (
										<ThemedText variant="body">Similar match</ThemedText>
									)}
								</View>
							</View>
							<Pressable
								onPress={() => handleAddFriend(user.id)}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								<ThemedText variant="body">Add Friend</ThemedText>
							</Pressable>
						</View>
					))}
				</View>
			)}
		</View>
	);
};

export { FriendSearch };
