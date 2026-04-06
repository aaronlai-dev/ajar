import { supabase } from "@/lib/supabase";
import {
	type EventResponse,
	EventResponseSchema,
} from "@/schemas/event.schema";
import { RELATIONSHIP_STATUS } from "@/schemas/relationship.schema";

// ─── Get Following Events ─────────────────────────────────────────────────────

async function getFollowingEvents(userId: string): Promise<EventResponse[]> {
	const { data: relationships, error: relError } = await supabase
		.from("relationships")
		.select("following_id")
		.eq("follower_id", userId)
		.eq("status", RELATIONSHIP_STATUS.accepted);

	if (relError) throw relError;

	const followingIds = relationships.map((r) => r.following_id);

	if (followingIds.length === 0) return [];

	const { data: events, error: eventsError } = await supabase
		.from("events")
		.select(`
			id,
			creator_id,
			created_at,
			title,
			description,
			location,
			address,
			place_id,
			start_time,
			end_time,
			is_private,
			tags,
			profiles!creator_id (
			  id,
				first_name,
				last_name,
				username,
				avatar_url
			)
		`)
		.in("creator_id", followingIds)
		.order("start_time", { ascending: true });

	if (eventsError) throw eventsError;

	const results = events.map((e) => {
		const { profiles, ...eventFields } = e;
		return EventResponseSchema.parse({
			...eventFields,
			creator: profiles,
		});
	});

	return results;
}

// ─── Delete Event ─────────────────────────────────────────────────────────────

async function deleteEvent(eventId: string): Promise<void> {
	const { error } = await supabase.from("events").delete().eq("id", eventId);

	if (error) throw error;
}

export { deleteEvent, getFollowingEvents };
