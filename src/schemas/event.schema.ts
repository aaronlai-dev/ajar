import { z } from "zod";

export const CreateEventSchema = z
	.object({
		creator_id: z.uuid(),
		title: z.string().min(1),
		start_time: z.iso.datetime({ offset: true }),
		end_time: z.iso.datetime({ offset: true }),

		// Optional fields
		description: z.string().min(1).optional().nullable(),
		address: z.string().min(1).optional().nullable(),
		place_id: z.string().optional().nullable(),
		location: z
			.object({
				latitude: z.number(),
				longitude: z.number(),
			})
			.optional()
			.nullable(),
		is_private: z.boolean().default(false),
	})
	.refine((data) => new Date(data.end_time) > new Date(data.start_time), {
		message: "End time must be after start time",
		path: ["end_time"],
	});

export type CreateEventFormInput = z.input<typeof CreateEventSchema>;

export type CreateEventOutput = z.output<typeof CreateEventSchema>;
