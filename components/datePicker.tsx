import { View, Pressable } from 'react-native';
import { Calendar, DateType } from './calendar';
import dayjs from 'dayjs';
import { CustomInput } from './customInput';
import { Modal } from './ui/modal';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { useState } from 'react';
import { CalendarDaysIcon } from './ui/icon';

interface DatePickerProps {
  showCalendar: boolean;
  setShowCalendar: (value: boolean) => void;
}

export default function DatePicker({ showCalendar, setShowCalendar }: DatePickerProps) {
  const [date, setDate] = useState<DateType>();

  return (
    <OverlayProvider>
      {/* Open the calendar */}
      <Pressable onPress={() => setShowCalendar(true)} className='-z-10'>
        <CustomInput
          value={date ? dayjs(date).format('MMMM DD, YYYY HH:mm') : null}
          placeholder="Pick a date"
          iconName={CalendarDaysIcon}
        />
      </Pressable>

      {/* Calendar Modal */}
      <Modal isOpen={showCalendar}>
        <View className="bg-white rounded-xl">
          <Calendar
            mode="single"
            date={date}
            onChange={({ date }) => {
              setDate(date);
            }}
            timePicker={true}
          />
        </View>
      </Modal>
    </OverlayProvider>
  );
}
