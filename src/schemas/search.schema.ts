import { z } from "zod";
import { userProfileSchema } from "./profile.schema";

export const searchResultSchema = userProfileSchema.extend({
	is_outgoing: z.boolean(),
	is_incoming: z.boolean(),
	outgoing_status: z.enum(["accepted", "pending"]).nullable(),
	incoming_status: z.enum(["accepted", "pending"]).nullable(),
});

export const searchResultsSchema = z.array(searchResultSchema);

export type SearchResult = z.infer<typeof searchResultSchema>;
export type SearchResults = z.infer<typeof searchResultsSchema>;
