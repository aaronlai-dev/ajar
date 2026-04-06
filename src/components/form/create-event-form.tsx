import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInMinutes } from "date-fns";
import { useRouter } from "expo-router";
import { RocketLaunchIcon } from "phosphor-react-native";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Switch, Text, View } from "react-native";
import { useAuth } from "@/contexts/auth-context";
import { useCreateEvent } from "@/hooks/use-create-event";
import {
	type CreateEventInput,
	CreateEventSchema,
} from "@/schemas/event.schema";
import { ThemedBorder } from "../ui/themed-border";
import { ThemedText } from "../ui/themed-text";
import { DateTimeField } from "./datetime-input";
import { GooglePlacesInput } from "./google-places-input";
import { TextInputLabel } from "./text-input-label";
import { ThemedTextInput } from "./themed-text-input";

// ─── Small shared UI ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
	return (
		<Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
			{children}
		</Text>
	);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MAX_CHAR_TITLE = 40;
const MAX_CHAR_DESC = 128;
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
	} = useForm<CreateEventInput>({
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
			is_private: true,
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

	const getDuration = () => {
		const totalMinutes = differenceInMinutes(endDate, startDate);
		if (totalMinutes <= 0) return "—";
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		if (hours === 0) return `${minutes} mins`;
		if (minutes === 0) return `${hours} hrs`;
		return `${hours} hrs ${minutes} mins`;
	};

	const onSubmit = (data: CreateEventInput) => {
		createEvent(data, {
			onSuccess: () => {
				reset();
			},
			onError: (err) => console.error(err.message),
		});

		router.back();
	};

	return (
		<View className="gap-y-4">
			{/* Title */}
			<View>
				<TextInputLabel label="title" errorMsg={errors.title?.message} />
				<Controller
					control={control}
					name="title"
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedTextInput
							placeholder="something fun!"
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							maxLength={MAX_CHAR_TITLE}
						/>
					)}
				/>
			</View>

			{/* Description */}
			<View>
				<TextInputLabel
					label="description"
					errorMsg={errors.description?.message}
				/>
				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, onBlur, value } }) => (
						<ThemedTextInput
							placeholder="something descriptive!"
							onChange={onChange}
							onBlur={onBlur}
							value={value ?? ""}
							maxLength={MAX_CHAR_DESC}
							multiline={true}
						/>
					)}
				/>
			</View>

			{/* Address */}
			<View>
				<TextInputLabel label="address" errorMsg={errors.address?.message} />
				<Controller
					control={control}
					name="address"
					render={({ field: { onChange, onBlur, value } }) => (
						<GooglePlacesInput />
					)}
				/>
			</View>

			{/* Start/End Datetime */}
			<View className="flex gap-2 mt-4">
				<View className="flex gap-4">
					<DateTimeField
						label="start"
						value={startDate}
						onChange={handleStartChange}
						error={errors.start_time?.message}
					/>
					<DateTimeField
						label=" end "
						value={endDate}
						minimumDate={startDate}
						onChange={handleEndChange}
						error={errors.end_time?.message}
					/>
				</View>

				<ThemedText variant="caption" className="w-full text-right pr-6">
					duration: {getDuration()}
				</ThemedText>
			</View>

			{/* Private toggle */}
			<View className="flex-row justify-between items-center px-1">
				<View>
					<ThemedText variant="body">private?</ThemedText>
					<Controller
						control={control}
						name="is_private"
						render={({ field: { value } }) => (
							<ThemedText variant="caption" className="text-gray-400 mt-0.5">
								{value
									? "only your followers can see this event"
									: "this event is public for everyone to see"}
							</ThemedText>
						)}
					/>
				</View>
				<View>
					<Controller
						control={control}
						name="is_private"
						render={({ field }) => (
							<Switch
								onValueChange={field.onChange}
								value={field.value}
								trackColor={{ false: "#d1d5db", true: "#6366f1" }}
								thumbColor="#ffffff"
							/>
						)}
					/>
				</View>
			</View>

			{/* Submit */}
			<ThemedBorder
				className={`w-full h-16 justify-center items-center mt-2 ${
					isPending ? "bg-indigo-300" : "bg-white"
				}`}
			>
				<Pressable
					className="flex-row w-full h-full justify-center items-center py-4 gap-2"
					onPress={handleSubmit(onSubmit)}
					disabled={isPending}
				>
					{isPending ? (
						<ActivityIndicator color="#000000" />
					) : (
						<>
							<Text className="text-black font-semibold text-base">
								Create Event
							</Text>
							<RocketLaunchIcon size={20} weight="bold" />
						</>
					)}
				</Pressable>
			</ThemedBorder>
		</View>
	);
};

export { CreateEventForm };
