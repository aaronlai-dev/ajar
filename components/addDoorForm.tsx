import { Pressable, Text, Alert } from 'react-native';
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
import EmojiPickerModal from './emojiModal';
import DateModal from './dateModal';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../app/contexts/auth'; // Import useAuth to get the logged-in user

export default function AddDoorForm() {
  const { user } = useAuth(); // Get logged-in user
  const db = getFirestore(); // Firestore instance

  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<DateType>();
  const [duration, setDuration] = useState('');
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isEmojiModalVisible, setEmojiModalVisible] = useState(false);

  const handleConfirm = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to add an event.");
      return;
    }

    if (!eventName || !location || !date || !duration) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    try {
      const eventRef = collection(db, "users", user.id, "events"); // Store event under user's collection
      await addDoc(eventRef, {
        eventName,
        eventDesc,
        location,
        date,
        duration: Number(duration), // Ensure duration is stored as a number
        emoji: selectedEmoji,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Event added successfully!");
    } catch (error) {
      console.error("Error adding event: ", error);
      Alert.alert("Error", "Could not add event. Please try again.");
    }
  };

  return (
    <FormControl className="border rounded-lg border-outline-300">
      <VStack space="xl" className="p-4">
        <VStack space="xs" className="-z-10">
          <Text className="text-typography-500">Event Name</Text>
          <Input className="min-w-[250px] ">
            <InputField type="text" onChangeText={setEventName} />
          </Input>
        </VStack>
        <VStack space="xs" className="-z-10">
          <Text className="text-typography-500">Event Description</Text>
          <Textarea className="min-w-[250px]">
            <TextareaInput type="text" onChangeText={setEventDesc} />
          </Textarea>
        </VStack>
        <VStack space="xs" className="-z-10">
          <Text className="text-typography-500">Location</Text>
          <Input className="text-center">
            <InputField type="text" onChangeText={setLocation} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 -z-10">Start Date/Time</Text>
          <DatePicker setShowCalendar={setDateModalVisible} date={date} />
        </VStack>
        <DateModal 
          isDateModalVisible={isDateModalVisible} 
          setDateModalVisible={setDateModalVisible} 
          date={date} 
          setDate={setDate}
        />
        <EmojiPickerModal 
          isEmojiModalVisible={isEmojiModalVisible} 
          setEmojiModalVisible={setEmojiModalVisible} 
          setSelectedEmoji={setSelectedEmoji} 
        />
        <HStack space="md" className='-z-10'>
          <VStack space="xs" className='w-2/5'>
            <Text className="text-typography-500">Duration (Hours)</Text>
            <Input>
              <InputField type="text" onChangeText={setDuration} />
            </Input>
          </VStack>
          <VStack space="xs" className='flex-1'>
            <EmojiPicker setEmojiModalVisible={setEmojiModalVisible} selectedEmoji={selectedEmoji} />
          </VStack>
        </HStack>
        <Button className='-z-20' onPress={handleConfirm}>
          <ButtonText className="text-typography-0">Confirm</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
