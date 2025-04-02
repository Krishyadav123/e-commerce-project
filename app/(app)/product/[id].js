import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Animated as RNAnimated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Header from '../../../components/Header';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);
  const carouselRef = useRef(null);
  
  // Mock product data
  const product = {
    id,
    name: 'Premium Wireless Earbuds Pro',
    price: 129.99,
    oldPrice: 199.99,
    discount: 35,
    rating: 4.8,
    reviewCount: 246,
    images: [
      'https://wallpapercave.com/wp/wp3386769.jpg',
      'https://wallpapercave.com/wp/wp3386769.jpg',
      'https://wallpapercave.com/wp/wp3386769.jpg',
      'https://wallpapercave.com/wp/wp3386769.jpg',
    ],
    colors: ['#000000', '#FFFFFF', '#3F51B5', '#E91E63'],
    sizes: ['S', 'M', 'L'],
    description: 'Experience premium sound quality with our latest wireless earbuds. Featuring noise cancellation, long battery life, and a comfortable fit, these earbuds are perfect for your active lifestyle.',
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.2 Connectivity',
      'IPX7 Water Resistance',
      '30-hour Battery Life',
      'Touch Controls',
      'Voice Assistant Compatible'
    ],
    inStock: true,
  };
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value > 100 ? withSpring(1) : withSpring(0),
      transform: [{ translateY: scrollY.value > 100 ? withSpring(0) : withSpring(-20) }],
    };
  });
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    scrollY.value = scrollPosition;
  };
  
  return (
    
    <View className="flex-1 px-5 bg-white">
      <StatusBar style="dark" />
      
      {/* Animated Header */}
      <Animated.View 
        style={[headerStyle]}
        className="absolute top-0 left-0 right-0 z-10 bg-white shadow-sm px-4 py-3 flex-row items-center justify-between"
      >
        <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>{product.name}</Text>
        <Text className="text-blue-500 font-bold">${product.price}</Text>
      </Animated.View>
      
      {/* Top Navigation */}
     
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View className="px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow-sm"
        >
          <AntDesign name="arrowleft" size={22} color="#333" />
        </TouchableOpacity>
        
        <View className="flex-row">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow-sm mr-2">
            <AntDesign name="hearto" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/80 items-center justify-center shadow-sm">
            <AntDesign name="sharealt" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
        {/* Product Image Carousel */}
        <View className="relative">
        <View className="px-5 flex items-center justify-center"> {/* This adds 20px padding on left and right */}
  <Carousel
    ref={carouselRef}
    loop
    width={width - 40} // Correctly subtracting the total padding (20px × 2)
    height={420}
    autoPlay={true}
    data={product.images}
    scrollAnimationDuration={1000}
    onSnapToItem={(index) => setActiveIndex(index)}
    renderItem={({ item }) => (
      <Image 
        source={{ uri: item }} 
        style={{ width: '100%', height: 420}}
        resizeMode="cover"
        className="shadow-sm rounded-xl"
      />
    )}
  />
</View>
          
          {/* Image Indicator */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
            {product.images.map((_, index) => (
              <View 
                key={index} 
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                }`} 
              />
            ))}
          </View>
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <View className="absolute top-4 right-4 bg-red-500 px-2 py-1 rounded-md">
              <Text className="text-white font-bold text-xs">-{product.discount}%</Text>
            </View>
          )}
        </View>
        
        {/* Product Info */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          className="px-4 pt-4"
        >
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-800">{product.name}</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-yellow-500">★ {product.rating}</Text>
                <Text className="text-gray-500 ml-1">({product.reviewCount} reviews)</Text>
              </View>
            </View>
            
            <View className="items-end">
              {product.oldPrice && (
                <Text className="text-gray-500 text-base line-through">${product.oldPrice}</Text>
              )}
              <Text className="text-2xl font-bold text-blue-500">${product.price}</Text>
            </View>
          </View>
          
          {/* Stock Status */}
          <View className="mt-2 flex-row items-center">
            {product.inStock ? (
              <>
                <View className="w-3 h-3 rounded-full bg-green-500" />
                <Text className="ml-1 text-green-500 text-sm">In Stock</Text>
              </>
            ) : (
              <>
                <View className="w-3 h-3 rounded-full bg-red-500" />
                <Text className="ml-1 text-red-500 text-sm">Out of Stock</Text>
              </>
            )}
          </View>
        </Animated.View>
        
        {/* Color Selection */}
        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          className="px-4 mt-6"
        >
          <Text className="text-lg font-bold text-gray-800 mb-2">Color</Text>
          <View className="flex-row">
            {product.colors.map((color, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setSelectedColor(index)}
                className={`w-10 h-10 rounded-full mr-3 items-center justify-center ${
                  selectedColor === index ? "border-2 border-blue-500" : ""
                }`}
                style={{ backgroundColor: color }}
              >
                {selectedColor === index && color === '#FFFFFF' && (
                  <AntDesign name="check" size={16} color="black" />
                )}
                {selectedColor === index && color !== '#FFFFFF' && (
                  <AntDesign name="check" size={16} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        
        {/* Size Selection */}
        <Animated.View 
          entering={FadeInUp.delay(400).springify()}
          className="px-4 mt-6"
        >
          <Text className="text-lg font-bold text-gray-800 mb-2">Size</Text>
          <View className="flex-row">
            {product.sizes.map((size, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setSelectedSize(index)}
                className={`w-12 h-12 rounded-lg mr-3 items-center justify-center ${
                  selectedSize === index 
                    ? "bg-blue-500 border-blue-500" 
                    : "bg-gray-100 border-gray-200"
                } border`}
              >
                <Text 
                  className={`font-medium ${
                    selectedSize === index ? "text-white" : "text-gray-800"
                  }`}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        
        {/* Quantity Selection */}
        <Animated.View 
          entering={FadeInUp.delay(500).springify()}
          className="px-4 mt-6"
        >
          <Text className="text-lg font-bold text-gray-800 mb-2">Quantity</Text>
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={decrementQuantity}
              className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center"
            >
              <AntDesign name="minus" size={20} color="#333" />
            </TouchableOpacity>
            
            <Text className="mx-4 text-lg font-bold text-gray-800">{quantity}</Text>
            
            <TouchableOpacity 
              onPress={incrementQuantity}
              className="w-10 h-10 rounded-lg bg-gray-100 items-center justify-center"
            >
              <AntDesign name="plus" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Product Tabs */}
        <Animated.View 
          entering={FadeInUp.delay(600).springify()}
          className="mt-6"
        >
          <View className="flex-row border-b border-gray-200">
            <TouchableOpacity 
              onPress={() => setActiveTab('description')}
              className={`flex-1 py-3 ${
                activeTab === 'description' ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <Text 
                className={`text-center font-medium ${
                  activeTab === 'description' ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Description
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setActiveTab('features')}
              className={`flex-1 py-3 ${
                activeTab === 'features' ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <Text 
                className={`text-center font-medium ${
                  activeTab === 'features' ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Features
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setActiveTab('reviews')}
              className={`flex-1 py-3 ${
                activeTab === 'reviews' ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <Text 
                className={`text-center font-medium ${
                  activeTab === 'reviews' ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          
          <View className="px-4 py-4">
            {activeTab === 'description' && (
              <Text className="text-gray-600 leading-6">{product.description}</Text>
            )}
            
            {activeTab === 'features' && (
              <View>
                {product.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                    <Text className="text-gray-700">{feature}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {activeTab === 'reviews' && (
              <View className="items-center justify-center py-4">
                <Text className="text-lg font-bold text-gray-800">{product.rating} out of 5</Text>
                <View className="flex-row my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AntDesign 
                      key={star}
                      name={star <= Math.floor(product.rating) ? "star" : star <= product.rating ? "staro" : "staro"} 
                      size={20} 
                      color={star <= product.rating ? "#FFD700" : "#E0E0E0"} 
                      style={{ marginHorizontal: 2 }}
                    />
                  ))}
                </View>
                <Text className="text-gray-500">Based on {product.reviewCount} reviews</Text>
                
                <TouchableOpacity className="mt-4 py-2 px-4 bg-gray-100 rounded-full">
                  <Text className="text-gray-700 font-medium">View All Reviews</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
        
        {/* Similar Products Section */}
        <Animated.View 
          entering={FadeInUp.delay(700).springify()}
          className="mt-2 mb-24"
        >
          <Text className="px-4 text-lg font-bold text-gray-800 mb-3">You Might Also Like</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
          >
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity 
                key={item}
                onPress={() => router.push(`/product/${item}`)}
                className="mr-4 w-36 rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <Image 
                  source={{ uri: `https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70` }} 
                  className="w-full h-36 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-2">
                  <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>Similar Item {item}</Text>
                  <Text className="text-sm text-gray-600">${Math.floor(Math.random() * 100) + 50}.99</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-xs text-yellow-500">★ {(Math.random() * (5 - 4) + 4).toFixed(1)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 flex-row shadow-lg border-t border-gray-200">
        <TouchableOpacity className="w-12 h-12 rounded-lg border border-gray-300 items-center justify-center mr-3">
          <AntDesign name="hearto" size={22} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity className="w-12 h-12 rounded-lg border border-gray-300 items-center justify-center mr-3">
          <AntDesign name="shoppingcart" size={22} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => console.log('Add to cart pressed')}
          className="flex-1 bg-blue-500 h-12 rounded-lg items-center justify-center flex-row"
        >
          <Text className="text-white font-bold text-base">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;