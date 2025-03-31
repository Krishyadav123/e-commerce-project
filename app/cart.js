import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../redux/slices/cartSlice";

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-xl font-bold">Cart Items: {cart.items.length}</Text>
      <Text className="text-lg">Total Price: ${cart.totalPrice}</Text>

      <Button title="Add Item" onPress={() => dispatch(addToCart({ id: 1, name: "Test Product", price: 100 }))} />
      <Button title="Clear Cart" onPress={() => dispatch(clearCart())} />
    </View>
  );
}
