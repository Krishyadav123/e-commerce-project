import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../../context/auth';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-6">Welcome!</Text>
      <Text className="mb-6">You are logged in as: {user?.email}</Text>
      
      <TouchableOpacity
        className="bg-red-500 p-3 rounded-lg w-32"
        onPress={signOut}
      >
        <Text className="text-white text-center font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}