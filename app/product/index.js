import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { products } from "../../data/products";

export default function ProductList() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-4 bg-gray-100 p-4 rounded-lg"
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2">{item.name}</Text>
            <Text className="text-gray-500">${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
