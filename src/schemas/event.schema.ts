import { z } from "zod";
import { userProfileSchema } from "./profile.schema";

// ─── Base ────────────────────────────────────────────────────────────────────
// Shared shape used to compose other schemas

const EventBaseSchema = z.object({
	title: z.string().min(1, "Title is required"),
	creator_id: z.uuid(),
	start_time: z.iso.datetime({ offset: true }),
	end_time: z.iso.datetime({ offset: true }),
	created_at: z.iso.datetime({ offset: true }),

	description: z.string().min(1).optional().nullable(),
	location: z.string().optional().nullable(),
	address: z.string().min(1).optional().nullable(),
	place_id: z.string().optional().nullable(),
	is_private: z.boolean().default(false),
	tags: z.array(z.string()).optional().nullable(),
});

const startAfterNow = {
	message: "Start time must be in the future",
	path: ["start_time"],
};

const endAfterStart = {
	message: "End time must be after start time",
	path: ["end_time"],
};

// ─── Create ──────────────────────────────────────────────────────────────────
// Used when submitting a new event. creator_id injected server-side from auth.

export const CreateEventSchema = EventBaseSchema.refine(
	(data) => new Date(data.start_time) > new Date(),
	startAfterNow,
).refine(
	(data) => new Date(data.end_time) > new Date(data.start_time),
	endAfterStart,
);

export type CreateEventInput = z.input<typeof CreateEventSchema>;
export type CreateEventOutput = z.output<typeof CreateEventSchema>;

// ─── Update ──────────────────────────────────────────────────────────────────
// All fields optional — only send what changed. id required to target the row.

export const UpdateEventSchema = EventBaseSchema.partial()
	.extend({ id: z.uuid() })
	.refine((data) => {
		if (data.start_time && data.end_time) {
			return new Date(data.start_time) > new Date();
		}
		return true;
	}, startAfterNow)
	.refine((data) => {
		if (data.start_time && data.end_time) {
			return new Date(data.end_time) > new Date(data.start_time);
		}
		return true;
	}, endAfterStart);

export type UpdateEventInput = z.input<typeof UpdateEventSchema>;
export type UpdateEventOutput = z.output<typeof UpdateEventSchema>;

// ─── Response ────────────────────────────────────────────────────────────────
const dateTransform = z.iso
	.datetime({ offset: true })
	.transform((val) => new Date(val));

export const EventResponseSchema = EventBaseSchema.extend({
	id: z.uuid(),
	creator: userProfileSchema,
	start_time: dateTransform,
	end_time: dateTransform,
	created_at: dateTransform,
}).refine(
	(data) => new Date(data.end_time) > new Date(data.start_time),
	endAfterStart,
);

export type EventResponse = z.output<typeof EventResponseSchema>;
