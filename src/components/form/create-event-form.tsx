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
import { useAuth } from "@/contexts/auth-context";
import { useCreateEvent } from "@/hooks/use-create-event";
import {
	type CreateEventFormInput,
	CreateEventSchema,
} from "@/schemas/event.schema";

function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return <Text className="text-red-500 text-xs mt-1 ml-1">{message}</Text>;
}

function Label({ children }: { children: React.ReactNode }) {
	return (
		<Text className="text-sm font-medium text-gray-700 mb-1 ml-1">
			{children}
		</Text>
	);
}

export function CreateEventForm() {
	const { user } = useAuth();
	const { mutate: createEvent, isPending } = useCreateEvent();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
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

	const onSubmit = (data: CreateEventFormInput) => {
		createEvent(data, {
			onSuccess: () => reset(),
			onError: (err) => console.error(err.message),
		});
	};

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="px-4 py-6 gap-y-5">
				{/* Title — required */}
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
					<FieldError message={errors.title?.message} />
				</View>

				{/* Description — optional */}
				<View>
					<Label>Description</Label>
					<Controller
						control={control}
						name="description"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 bg-gray-50 min-h-[100px]"
								placeholder="What's this event about? (optional)"
								onChangeText={(text) => onChange(text || null)} // empty string → null
								onBlur={onBlur}
								value={value ?? ""} // null → empty string for display
								multiline
								textAlignVertical="top"
							/>
						)}
					/>
					<FieldError message={errors.description?.message} />
				</View>

				{/* Start time — required */}
				<View>
					<Label>Start Time *</Label>
					<Controller
						control={control}
						name="start_time"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 bg-gray-50"
								placeholder="2025-06-01T10:00:00+10:00"
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					<FieldError message={errors.start_time?.message} />
				</View>

				{/* End time — required */}
				<View>
					<Label>End Time *</Label>
					<Controller
						control={control}
						name="end_time"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 bg-gray-50"
								placeholder="2025-06-01T12:00:00+10:00"
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
					<FieldError message={errors.end_time?.message} />
				</View>

				{/* Address — optional */}
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
					<FieldError message={errors.address?.message} />
				</View>

				{/* Private toggle — optional with default */}
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
}
