import { supabase } from "@/lib/supabase";
import { CreateEventSchema } from "@/schemas/event.schema";

async function getFollowingEvents(userId: string) {
	// Step 1: Get all user IDs that the current user follows
	const { data: relationships, error: relError } = await supabase
		.from("relationships")
		.select("following_id")
		.eq("follower_id", userId);

	if (relError) throw relError;

	const followingIds = relationships.map((r) => r.following_id);

	if (followingIds.length === 0) return [];

	// Step 2: Fetch events created by those users
	const { data: events, error: eventsError } = await supabase
		.from("events")
		.select(`
      id,
      creator_id,
      title,
      description,
      location,
      place_id,
      start_time,
      end_time,
      is_private
    `)
		.in("creator_id", followingIds)
		.order("start_time", { ascending: true });

	if (eventsError) throw eventsError;

	const parsedEvents = events.map((e) => CreateEventSchema.parse(e));

	return parsedEvents;
}

export { getFollowingEvents };
