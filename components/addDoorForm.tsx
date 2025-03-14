import { Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import { FormControl } from './ui/form-control';
import { VStack } from './ui/vstack';
import { HStack } from './ui/hstack';
import { Input, InputField } from './ui/input';
import { Button, ButtonText } from './ui/button';
import { Textarea, TextareaInput } from './ui/textarea';
import { DateType } from 'react-native-ui-datepicker';
import DatePicker from './datePicker';

import EmojiPicker from './emojiPicker';

export default function AddDoorForm() {
  let today = new Date();
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [location, setLocation] = useState('');
  const [startDT, setStartDT] = useState<DateType>(today);
  const [endDT, setEndDT] = useState<DateType>(today);
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);

  const setDates = (startDate: DateType, endDate: DateType) => {
    setStartDT(startDate);
    setEndDT(endDate);
  };

  return (
    <FormControl className="border rounded-lg border-outline-300">
      {/* Pressable overlay for closing the calendar */}
      {showCalendar1 && (
        <Pressable
          className="absolute inset-0 bg-black/50 rounded-md"
          onPress={() => setShowCalendar1(false)}
        />
      )}

      {showCalendar2 && (
        <Pressable
          className="absolute inset-0 bg-black/50 rounded-md"
          onPress={() => setShowCalendar2(false)}
        />
      )}

      <VStack space="xl" className="p-4">
        <VStack space="xs" className="-z-10">
          <Text className="text-typography-500">Event Name</Text>
          <Input className="min-w-[250px] ">
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs" className="-z-10">
          <Text className="text-typography-500">Event Description</Text>
          <Textarea className="min-w-[250px]">
            <TextareaInput type="text" />
          </Textarea>
        </VStack>
        <VStack space="xs" className="-z-10">
          <Text className="text-typography-500">Location</Text>
          <Input className="text-center">
            <InputField />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 -z-10">Start Date/Time</Text>
          <DatePicker showCalendar={showCalendar1} setShowCalendar={setShowCalendar1} />
        </VStack>
        <HStack space="md" className='-z-10'>
          <VStack space="xs" className='w-2/5'>
            <Text className="text-typography-500">Duration (Hours)</Text>
            <Input>
              <InputField />
            </Input>
          </VStack>
          <VStack space="xs" className='flex-1'>
            <EmojiPicker />
          </VStack>
        </HStack>
        <Button className='-z-10'>
          <ButtonText className="text-typography-0">Confirm</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
