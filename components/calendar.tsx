import DateTimePicker, {
  DateType,
  CalendarDay,
  CalendarComponents,
  useDefaultClassNames,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

const icons: CalendarComponents = {
  IconPrev: (
    <Feather name="chevron-left" size={20} className="text-foreground" />
  ),
  IconNext: (
    <Feather name="chevron-right" size={20} className="text-foreground" />
  ),
};

export type CalendarProps = React.ComponentProps<typeof DateTimePicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  containerHeight = 280,
  components,
  ...props
}: React.ComponentProps<typeof DateTimePicker>) {
  let today = new Date();

  const defaultClassNames = useDefaultClassNames();
  const defaultStyles = useDefaultStyles();

  return (
    <DateTimePicker
      minDate={today}
      showOutsideDays={showOutsideDays}
      className={`border-muted bg-card shadow-muted w-[310] rounded-xl border p-2 shadow-lg dark:shadow-none ${className || ''}`}
      containerHeight={containerHeight}
      disableYearPicker={true}
      classNames={{
        ...defaultClassNames,
        day_cell: 'p-1',
        day: `${defaultClassNames.day} rounded-lg`,
        outside_label: 'opacity-50',
        month_selector_label: `${defaultClassNames.month_selector_label} text-base font-medium`,
        time_label: 'text-2xl font-medium text-foreground',
        month: `${defaultClassNames.month} rounded-lg`,
        year: `${defaultClassNames.year} rounded-lg`
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

export { Calendar, DateType, CalendarDay };
