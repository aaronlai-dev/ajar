import { CaretLeftIcon, CaretRightIcon } from "phosphor-react-native";
import DateTimePicker, {
	type CalendarComponents,
	CalendarDay,
	DateType,
	useDefaultClassNames,
	useDefaultStyles,
} from "react-native-ui-datepicker";

export type CalendarProps = React.ComponentProps<typeof DateTimePicker>;

const icons: CalendarComponents = {
	IconPrev: <CaretLeftIcon size={20} weight="bold" />,
	IconNext: <CaretRightIcon size={20} weight="bold" />,
};

export function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	containerHeight = 280,
	components,
	...props
}: CalendarProps) {
	const today = new Date();
	const defaultClassNames = useDefaultClassNames();
	const defaultStyles = useDefaultStyles();

	return (
		<DateTimePicker
			minDate={today}
			showOutsideDays={showOutsideDays}
			containerHeight={containerHeight}
			disableYearPicker
			className={`w-[310px] rounded-xl border border-muted bg-card p-2 shadow-lg ${className ?? ""}`}
			classNames={{
				...defaultClassNames,
				day_cell: "p-1",
				day: `${defaultClassNames.day} rounded-lg`,
				outside_label: "opacity-40",
				month_selector_label: `${defaultClassNames.month_selector_label} text-base font-medium`,
				time_label: "text-2xl font-medium text-foreground",
				month: `${defaultClassNames.month} rounded-lg`,
				year: `${defaultClassNames.year} rounded-lg`,
				...classNames,
			}}
			components={{
				...icons,
				...components,
			}}
			styles={{
				...defaultStyles,
			}}
			{...props}
		/>
	);
}

export { DateType, CalendarDay };
