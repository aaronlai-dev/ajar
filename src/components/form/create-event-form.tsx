import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Pressable,
	Switch,
	Text,
	TextInput,
	View,
} from "react-native";
import { useAuth } from "@/contexts/auth-context";
import { useCreateEvent } from "@/hooks/use-create-event";
import {
	type CreateEventFormInput,
	CreateEventSchema,
} from "@/schemas/event.schema";
import { DateTimeField } from "./datetime-input";

// ─── Small shared UI ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
	return (
		<Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
			{children}
		</Text>
	);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_DURATION_MS = 60 * 60 * 1000; // 1 hour

function toISO(date: Date): string {
	return date.toISOString();
}

// ─── Form ─────────────────────────────────────────────────────────────────────

const CreateEventForm = () => {
	const router = useRouter();
	const { user } = useAuth();
	const { mutate: createEvent, isPending } = useCreateEvent();

	// Local Date objects drive the pickers; ISO strings are written to the form.
	const defaultStart = new Date();
	defaultStart.setMinutes(0, 0, 0); // zero out minutes, seconds, ms
	defaultStart.setHours(defaultStart.getHours() + 1); // advance to next hour
	const defaultEnd = new Date(defaultStart.getTime() + DEFAULT_DURATION_MS);

	const [startDate, setStartDate] = useState<Date>(defaultStart);
	const [endDate, setEndDate] = useState<Date>(defaultEnd);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<CreateEventFormInput>({
		resolver: zodResolver(CreateEventSchema),
		defaultValues: {
			creator_id: user?.id ?? "",
			title: "",
			start_time: toISO(defaultStart),
			end_time: toISO(defaultEnd),
			description: null,
			address: null,
			place_id: null,
			location: null,
			is_private: false,
		},
	});

	// Keep local state + form field in sync for start time.
	const handleStartChange = (date: Date) => {
		setStartDate(date);
		setValue("start_time", toISO(date), { shouldValidate: true });

		// Push end time forward if it would be before the new start.
		if (date >= endDate) {
			const newEnd = new Date(date.getTime() + DEFAULT_DURATION_MS);
			setEndDate(newEnd);
			setValue("end_time", toISO(newEnd), { shouldValidate: true });
		}
	};

	// Keep local state + form field in sync for end time.
	const handleEndChange = (date: Date) => {
		setEndDate(date);
		setValue("end_time", toISO(date), { shouldValidate: true });
	};

	const onSubmit = (data: CreateEventFormInput) => {
		createEvent(data, {
			onSuccess: () => {
				reset();
			},
			onError: (err) => console.error(err.message),
		});

		router.back();
	};

	return (
		<View className="gap-y-5">
			{/* Title */}
			<View>
				<Label>Title *</Label>
				<Controller
					control={control}
					name="title"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 bg-gray-50"
							placeholder="Event title"
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
						/>
					)}
				/>
				{errors.title?.message && (
					<Text className="text-red-500 text-xs mt-1 ml-1">
						{errors.title.message}
					</Text>
				)}
			</View>

			{/* Description */}
			<View>
				<Label>Description</Label>
				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 bg-gray-50 min-h-[100px]"
							placeholder="What's this event about? (optional)"
							onChangeText={(text) => onChange(text || null)}
							onBlur={onBlur}
							value={value ?? ""}
							multiline
							textAlignVertical="top"
						/>
					)}
				/>
				{errors.description?.message && (
					<Text className="text-red-500 text-xs mt-1 ml-1">
						{errors.description.message}
					</Text>
				)}
			</View>

			{/* Start Date/Time */}
			<DateTimeField
				label="Start"
				value={startDate}
				onChange={handleStartChange}
				error={errors.start_time?.message}
			/>

			{/* End Date/Time */}
			<DateTimeField
				label="End"
				value={endDate}
				minimumDate={startDate}
				onChange={handleEndChange}
				error={errors.end_time?.message}
			/>

			{/* Address */}
			<View>
				<Label>Address</Label>
				<Controller
					control={control}
					name="address"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 bg-gray-50"
							placeholder="123 Example St (optional)"
							onChangeText={(text) => onChange(text || null)}
							onBlur={onBlur}
							value={value ?? ""}
						/>
					)}
				/>
				{errors.address?.message && (
					<Text className="text-red-500 text-xs mt-1 ml-1">
						{errors.address.message}
					</Text>
				)}
			</View>

			{/* Private toggle */}
			<View className="flex-row items-center justify-between px-1">
				<View>
					<Text className="text-sm font-medium text-gray-700">
						Private Event
					</Text>
					<Text className="text-xs text-gray-400 mt-0.5">
						Only invited guests can see this
					</Text>
				</View>
				<Controller
					control={control}
					name="is_private"
					render={({ field: { onChange, value } }) => (
						<Switch
							onValueChange={onChange}
							value={value}
							trackColor={{ false: "#d1d5db", true: "#6366f1" }}
							thumbColor="#ffffff"
						/>
					)}
				/>
			</View>

			{/* Submit */}
			<Pressable
				className={`rounded-xl py-4 items-center mt-2 ${
					isPending ? "bg-indigo-300" : "bg-indigo-500"
				}`}
				onPress={handleSubmit(onSubmit)}
				disabled={isPending}
			>
				{isPending ? (
					<ActivityIndicator color="#ffffff" />
				) : (
					<Text className="text-white font-semibold text-base">
						Create Event
					</Text>
				)}
			</Pressable>
		</View>
	);
};

export { CreateEventForm };
