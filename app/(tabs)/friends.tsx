import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useUserData } from "@/hooks/useUserData";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import PendingRequests from "@/components/pendingRequests";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react-native";

interface Friend {
  id: string;
  name: string;
  photo?: string;
}

export default function FriendsList() {
  const { userData, isLoading } = useUserData();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      if (!userData?.friends?.length) return;

      const friendPromises = userData.friends.map(async (friendId: string) => {
        const friendRef = doc(db, "users", friendId);
        const friendSnap = await getDoc(friendRef);
        if (friendSnap.exists()) {
          return { id: friendId, name: friendSnap.data().name, photo: friendSnap.data().photoURL };
        }
        return null;
      });

      const friendData = (await Promise.all(friendPromises)).filter(Boolean);
      setFriends(friendData as Friend[]);
    };

    if (userData) fetchFriends();
  }, [userData]);

  const confirmDeleteFriend = async () => {
    if (!selectedFriend || !userData?.id) return;
    
    try {
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        friends: arrayRemove(selectedFriend.id),
      });

      // Refresh friends list
      setFriends((prev) => prev.filter((friend) => friend.id !== selectedFriend.id));
      setSelectedFriend(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (isLoading)
    return <Spinner className="text-blue-500 w-6 h-6 self-center mt-4" />;

  return (
    <SafeAreaView className="p-4 h-full">
      <Text className="text-lg font-bold mb-2">Friends List</Text>
      <PendingRequests />
      {friends.length === 0 ? (
        <Text className="text-gray-500">No friends yet.</Text>
      ) : (
        <FlashList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between p-2">
              <View className="flex-row items-center gap-3">
                <Avatar className="w-10 h-10 rounded-full bg-gray-300">
                  <AvatarFallbackText>{item.name}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: item.photo,
                    }}
                  />
                </Avatar>
                <Text className="text-md">{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFriend(item);
                  setDialogOpen(true);
                }}
                className="p-2"
              >
                <Icon as={Trash2} className="text-red-500 w-6 h-6" />
              </TouchableOpacity>
            </View>
          )}
          estimatedItemSize={56}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} size="md" >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="text-lg font-bold">Remove Friend</Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Are you sure you want to remove {selectedFriend?.name} from your friends list?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onPress={() => setDialogOpen(false)}>Cancel</Button>
            <Button onPress={confirmDeleteFriend}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
}
