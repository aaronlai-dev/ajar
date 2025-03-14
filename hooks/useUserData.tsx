import { useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../app/contexts/auth';

export function useUserData() {
  const { user, isLoading } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    if (!user) return;

    const db = getFirestore();
    const userRef = doc(db, "users", user.id);

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData({
          ...user,
          ...userDoc.data(),
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Refresh function to manually fetch latest user data
  const refreshUserData = useCallback(() => {
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      fetchUserData();
    }
  }, [user, isLoading]);

  return { userData, isLoading, refreshUserData };
}
