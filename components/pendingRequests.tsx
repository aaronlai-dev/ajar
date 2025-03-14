import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ChevronsRight } from 'lucide-react-native';
import { useUserData } from '@/hooks/useUserData';

export default function PendingRequestsButton() {
  const router = useRouter();
  const { userData } = useUserData();
  const pendingCount = userData?.pendingRequests?.length || 0;

  return (
    <TouchableOpacity 
      onPress={() => router.push('/pendingRequestsModal')} 
      className="flex-row items-center justify-between bg-gray-100 px-4 py-3 mb-4 rounded-lg shadow-md"
    >
      {/* Counter Badge */}
      <View className="bg-red-500 px-3 py-1 rounded-full">
        <Text className="text-white font-bold text-sm">{pendingCount}</Text>
      </View>

      {/* Button Text */}
      <Text className="text-md font-semibold text-gray-800 ml-3 flex-1">
        Pending Requests
      </Text>

      {/* Arrow Icon */}
      <Icon as={ChevronsRight} className="text-gray-600 w-5 h-5" />
    </TouchableOpacity>
  );
}
