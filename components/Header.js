import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../context/AuthContext'  // 🔥 AuthContext se logout function import

const Header = () => {
  const { user, logout } = useAuth();  // 🔥 Logout function access kiya
  const router = useRouter();

  return (
    <View className="px-4 pt-4 pb-4 bg-white shadow-sm">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">Logo</Text>
          <View className="flex-row">
            <TouchableOpacity 
              onPress={() => router.push('/search')}
              className="mr-4"
            >
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/filter')}>
              <AntDesign name="shoppingcart" size={24} color="black" />
            </TouchableOpacity>
            {user && (  // 🔥 Sirf tab dikhao jab user logged in ho
              <TouchableOpacity  
                onPress={async () => {
                  await logout();
                  router.replace("/(auth)/login");  // Logout ke baad login page pe bhej diya
                }}
              >
                <Text className="text-sm font-semibold bg-red-500 text-white px-2 py-1 rounded-md ml-2">Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
  )
}

export default Header;
