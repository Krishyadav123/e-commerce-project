import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Header = () => {
    const router = useRouter()
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
              {/* <Text className="text-xl">🛒</Text> */}
              <AntDesign name="shoppingcart" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
}

export default Header