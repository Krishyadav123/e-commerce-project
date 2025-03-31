import { View, Text, Image, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { products } from "../../data/products";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);
  const dispatch = useDispatch();

  if (!product) {
    return <Text className="text-center mt-10 text-xl">Product not found</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Image source={{ uri: product.image }} className="w-full h-60 rounded-lg" />
      <Text className="text-2xl font-bold mt-4">{product.name}</Text>
      <Text className="text-lg text-gray-500">${product.price.toFixed(2)}</Text>
      <Text className="text-gray-600 mt-2">{product.description}</Text>

      <Button title="Add to Cart" onPress={() => dispatch(addToCart(product))} />
    </View>
  );
}
