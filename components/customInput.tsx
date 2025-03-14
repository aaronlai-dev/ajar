import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';
import { Text } from './ui/text';
import { AddIcon, Icon } from './ui/icon';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

type Props = {
  value: string | null;
  placeholder: string;
  iconName: typeof AddIcon;
};

export function CustomInput({ value, placeholder, iconName }: Props) {

  return (
    <View className="border-muted bg-card shadow-muted h-10 flex-row items-center gap-2 rounded-md border px-3 shadow-lg dark:shadow-none">
      <Icon as={iconName} className="text-foreground text-black" />
      <Text
        numberOfLines={1}
        className={`text-muted-foreground overflow-hidden text-ellipsis text-base ${value ? 'text-foreground' : ''}`}
      >
        {value || placeholder}
      </Text>
    </View>
  );
}
