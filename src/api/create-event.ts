import { supabase } from "@/lib/supabase";
import {
	type CreateEventOutput,
	CreateEventSchema,
} from "@/schemas/event.schema";

async function createEvent(input: CreateEventOutput) {
	const validated = CreateEventSchema.parse(input);

	const { data, error } = await supabase
		.from("events")
		.insert({
			creator_id: validated.creator_id,
			title: validated.title,
			start_time: validated.start_time,
			end_time: validated.end_time,
			is_private: validated.is_private,

			description: validated.description ?? null,
			tags: validated.tags ?? null,
			address: validated.address ?? null,
			place_id: validated.place_id ?? null,
			location: validated.location
				? `POINT(${validated.location.longitude} ${validated.location.latitude})`
				: null,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

export { createEvent };
