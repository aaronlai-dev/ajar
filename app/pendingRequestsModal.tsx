import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Check, X } from 'lucide-react-native';
import { FlashList } from "@shopify/flash-list";
import { useUserData } from '@/hooks/useUserData';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { Spinner } from '@/components/ui/spinner';

interface FriendRequest {
  id: string;
  name: string;
  email: string;
}

export default function PendingRequestsModal() {
  const { userData, isLoading, refreshUserData } = useUserData();
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const db = getFirestore();
  const router = useRouter();

  useEffect(() => {
    const fetchFriendRequests = async () => {
      if (!userData?.pendingRequests?.length) return;

      const requestPromises = userData.pendingRequests.map(async (friendId: string) => {
        const friendRef = doc(db, "users", friendId);
        const friendSnap = await getDoc(friendRef);
        if (friendSnap.exists()) {
          return { id: friendId, name: friendSnap.data().name, email: friendSnap.data().email };
        }
        return null;
      });

      const friendRequestData = (await Promise.all(requestPromises)).filter(Boolean);
      setRequests(friendRequestData as FriendRequest[]);
    };

    if (userData) fetchFriendRequests();
  }, [userData]);

  const acceptRequest = async (friendId: string) => {
    if (!userData) return;

    const userRef = doc(db, "users", userData.id);
    const friendRef = doc(db, "users", friendId);

    try {
      // Add friend to user's friend list
      await updateDoc(userRef, {
        friends: [...(userData.friends || []), friendId],
        pendingRequests: userData.pendingRequests.filter((id: string) => id !== friendId),
      });

      // Add user to friend's friend list
      const friendSnap = await getDoc(friendRef);
      if (friendSnap.exists()) {
        await updateDoc(friendRef, {
          friends: [...(friendSnap.data().friends || []), userData.id],
        });
      }

      deleteRequest(friendId);

      // Update UI
      setRequests(requests.filter((request) => request.id !== friendId));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const deleteRequest = async (friendId: string) => {
    if (!userData) return;

    const userRef = doc(db, "users", userData.id);

    try {
      // Remove from pending requests
      await updateDoc(userRef, {
        pendingRequests: userData.pendingRequests.filter((id: string) => id !== friendId),
      });

      // Update UI
      setRequests(requests.filter((request) => request.id !== friendId));
      refreshUserData();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  if (isLoading) {
    return <Spinner className="text-blue-500 w-6 h-6 self-center mt-4" />;
  }

  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {/* Header with Back Button & Title */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="p-3 bg-gray-200 rounded-full"
        >
          <Icon as={ArrowLeft} className="text-gray-700 w-5 h-5" />
        </TouchableOpacity>

        <Text className="text-xl font-semibold ml-4 text-gray-900">
          Pending Requests
        </Text>
      </View>

      {/* Pending Requests List */}
      {requests.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-base">No pending requests</Text>
        </View>
      ) : (
        <FlashList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-gray-100 rounded-lg p-4 mb-2">
              {/* Name */}
              <Text className="text-md font-medium text-gray-800">{item.name}</Text>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                {/* Accept Button */}
                <TouchableOpacity 
                  onPress={() => acceptRequest(item.id)} 
                  className="p-2 bg-green-500 rounded-full"
                >
                  <Icon as={Check} className="text-white w-5 h-5" />
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity 
                  onPress={() => deleteRequest(item.id)} 
                  className="p-2 bg-red-500 rounded-full"
                >
                  <Icon as={X} className="text-white w-5 h-5" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          estimatedItemSize={60}
        />
      )}
    </View>
  );
}
