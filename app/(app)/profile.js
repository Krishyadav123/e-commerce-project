import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser; // Get logged-in user

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/home'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-2xl font-bold mb-2">Profile</Text>
      <Text className="text-lg text-gray-600 mb-4">{user?.email || 'No Email Found'}</Text>

      <TouchableOpacity
        className="bg-red-500 px-6 py-2 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white text-lg font-medium">Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 px-6 py-2 rounded-lg"
        onPress={() => router.push('/home')}
      >
        <Text className="text-white text-lg font-medium">Home</Text>
      </TouchableOpacity>
    </View>
  );
}
