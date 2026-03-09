import { useQuery } from "@tanstack/react-query";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import {
	type SearchResults,
	searchResultsSchema,
} from "@/schemas/search.schema";

export function useSearchProfiles(searchTerm: string) {
	const { user } = useAuthenticatedUser();

	return useQuery({
		queryKey: ["profiles", "search", searchTerm.trim(), user.id],
		queryFn: async (): Promise<SearchResults> => {
			const { data, error } = await supabase.rpc("search_profiles", {
				search_term: searchTerm.trim(),
				current_user_id: user.id,
				search_limit: 20,
			});

			if (error) throw error;

			return searchResultsSchema.parse(data || []);
		},
		enabled: searchTerm.trim().length > 0,
		staleTime: 1000 * 60 * 5,
	});
}
