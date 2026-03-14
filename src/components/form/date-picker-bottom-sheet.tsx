import {
	BottomSheetBackdrop,
	type BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CalendarIcon, CheckIcon, XIcon } from "phosphor-react-native";
import { useCallback, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import type { DateType } from "react-native-ui-datepicker";
import { formatDisplay } from "@/utils/date-utils";
import { ThemedText } from "../ui/themed-text";
import { Calendar } from "./calendar";

interface DatePickerBottomSheetProps {
	value: string;
	onChange: (isoString: string) => void;
	label: string;
	placeholder?: string;
	minDate?: Date;
	errorMessage?: string;
}

export function DatePickerBottomSheet({
	value,
	onChange,
	label,
	placeholder = "Select date & time",
	minDate,
	errorMessage,
}: DatePickerBottomSheetProps) {
	const sheetRef = useRef<BottomSheetModal>(null);

	// Local draft state — only committed to the form on Submit
	const [draft, setDraft] = useState<DateType>(
		value ? new Date(value) : new Date(),
	);

	const openSheet = () => {
		// Reset draft to current form value each time it opens
		setDraft(value ? new Date(value) : new Date());
		sheetRef.current?.present();
	};

	const handleCancel = () => {
		sheetRef.current?.close();
	};

	const handleSubmit = () => {
		if (!draft) return;
		const d = draft instanceof Date ? draft : new Date(draft as string);
		onChange(d.toISOString());
		sheetRef.current?.close();
	};

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				pressBehavior="close"
			/>
		),
		[],
	);

	const hasValue = Boolean(value);

	return (
		<>
			{/* ── Trigger ─────────────────────────────────────────────────── */}
			<View className="gap-y-1">
				<ThemedText
					variant="body"
					className="text-sm font-medium text-gray-700 ml-1"
				>
					{label}
				</ThemedText>

				<Pressable
					onPress={openSheet}
					className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 active:bg-gray-100"
				>
					<ThemedText
						variant="body"
						className={`text-base ${hasValue ? "text-gray-900" : "text-gray-400"}`}
					>
						{hasValue ? formatDisplay(value) : placeholder}
					</ThemedText>
					<CalendarIcon size={20} weight="regular" />
				</Pressable>

				{errorMessage ? (
					<ThemedText variant="body" className="text-red-500 text-xs mt-1 ml-1">
						{errorMessage}
					</ThemedText>
				) : null}
			</View>

			{/* ── Bottom Sheet ─────────────────────────────────────────────── */}
			<BottomSheetModal
				ref={sheetRef}
				index={0}
				enableDynamicSizing
				enablePanDownToClose
				backdropComponent={renderBackdrop}
				handleIndicatorStyle={{ backgroundColor: "#d1d5db", width: 40 }}
				backgroundStyle={{ backgroundColor: "#ffffff" }}
			>
				<BottomSheetView className="pb-10">
					{/* Header row */}
					<View className="flex-row items-center justify-between px-4 pt-2 pb-4 border-b border-gray-100">
						<Pressable
							onPress={handleCancel}
							className="px-3 py-1.5 rounded-lg active:bg-gray-100"
							hitSlop={8}
						>
							<XIcon size={24} color="#9ca3af" />
						</Pressable>

						<ThemedText
							variant="body"
							className="text-base font-semibold text-gray-900"
						>
							{label}
						</ThemedText>

						<Pressable
							onPress={handleSubmit}
							className="px-3 py-1.5 rounded-lg bg-indigo-500 active:bg-indigo-600"
							hitSlop={8}
						>
							<CheckIcon size={24} color="#ffffff" />
						</Pressable>
					</View>

					{/* Calendar */}
					<View className="items-center px-4 pt-4">
						<Calendar
							mode="single"
							date={draft}
							onChange={({ date }) => setDraft(date)}
							timePicker={true}
							minDate={minDate}
						/>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
}
