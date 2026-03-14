import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Switch,
	Text,
	TextInput,
	View,
} from "react-native";
import { DatePickerBottomSheet } from "@/components/form/date-picker-bottom-sheet";
import { useAuth } from "@/contexts/auth-context";
import { useCreateEvent } from "@/hooks/use-create-event";
import {
	type CreateEventFormInput,
	CreateEventSchema,
} from "@/schemas/event.schema";

// ─── Small shared UI ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
	return (
		<Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
			{children}
		</Text>
	);
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_DURATION_MS = 60 * 60 * 1000; // 1 hour

// ─── Form ─────────────────────────────────────────────────────────────────────

const CreateEventForm = () => {
	const { user } = useAuth();
	const { mutate: createEvent, isPending } = useCreateEvent();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<CreateEventFormInput>({
		resolver: zodResolver(CreateEventSchema),
		defaultValues: {
			creator_id: user?.id ?? "",
			title: "",
			start_time: "",
			end_time: "",
			description: null,
			address: null,
			place_id: null,
			location: null,
			is_private: false,
		},
	});

	const startTime = watch("start_time");
	const endTime = watch("end_time");

	// When start changes, auto-fill end (+1 hr) unless end is already set
	// and still valid (after the new start).
	const handleStartChange = (isoString: string) => {
		setValue("start_time", isoString, { shouldValidate: true });

		const newStart = new Date(isoString);
		const currentEnd = endTime ? new Date(endTime) : null;

		if (!currentEnd || currentEnd <= newStart) {
			const autoEnd = new Date(newStart.getTime() + DEFAULT_DURATION_MS);
			setValue("end_time", autoEnd.toISOString(), { shouldValidate: true });
		}
	};

	const handleEndChange = (isoString: string) => {
		setValue("end_time", isoString, { shouldValidate: true });
	};

	const onSubmit = (data: CreateEventFormInput) => {
		createEvent(data, {
			onSuccess: () => reset(),
			onError: (err) => console.error(err.message),
		});
	};

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="px-4 py-6 gap-y-5">
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

				{/* ── Start datetime ───────────────────────────────────────── */}
				<DatePickerBottomSheet
					label="Start *"
					value={startTime}
					onChange={handleStartChange}
					placeholder="Select start date & time"
					errorMessage={errors.start_time?.message}
				/>

				{/* ── End datetime ─────────────────────────────────────────── */}
				<DatePickerBottomSheet
					label="End *"
					value={endTime}
					onChange={handleEndChange}
					placeholder="Select end date & time"
					// Prevent picking an end before the start
					minDate={startTime ? new Date(startTime) : undefined}
					errorMessage={errors.end_time?.message}
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
		</ScrollView>
	);
};

export { CreateEventForm };
