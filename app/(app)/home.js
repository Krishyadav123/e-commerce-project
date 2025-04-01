import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../components/Header';
// import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const carouselRef = useRef(null);
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  const bannerData = [
    { id: 1, image: 'https://wallpapercave.com/wp/wp3386769.jpg', title: 'Summer Sale' },
    { id: 2, image: 'https://wallpaperaccess.com/full/809523.jpg', title: 'New Collection' },
    { id: 3, image: 'https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg', title: 'Limited Edition' },
  ];
  
  const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Men' },
    { id: 3, name: 'Women' },
    { id: 4, name: 'Kids' },
    { id: 5, name: 'Electronics' },
  ];
  
  const trendingProducts = [
    { id: 1, name: 'Leather Jacket', price: '$129.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.8 },
    { id: 2, name: 'Smart Watch', price: '$199.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.5 },
    { id: 3, name: 'Wireless Earbuds', price: '$89.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.7 },
    { id: 4, name: 'Sneakers', price: '$79.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.6 },
  ];
  
  const newArrivals = [
    { id: 1, name: 'Summer Dress', price: '$59.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.3 },
    { id: 2, name: 'Casual Shirt', price: '$39.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.2 },
    { id: 3, name: 'Sunglasses', price: '$29.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.4 },
    { id: 4, name: 'Backpack', price: '$49.99', image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/g/i/i/free-rusulsaree-lorofy-unstitched-original-imah892khvtxxstc.jpeg?q=70', rating: 4.5 },
  ];
  
  const renderBanner = ({ item }) => {
    return (
      <TouchableOpacity 
        className="relative rounded-xl overflow-hidden"
        onPress={() => console.log('Banner pressed', item.id)}
      >
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40">
          <Text className="text-white text-xl font-bold">{item.title}</Text>
          <Text className="text-white text-sm">Shop Now</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderProductItem = (item, index) => {
    return (
      <Animated.View 
        entering={FadeInRight.delay(index * 100).springify()}
        className="mr-4 w-36 rounded-xl overflow-hidden bg-white"
      >
        <TouchableOpacity 
          onPress={() => router.push(`/product/${item.id}`)}
          className="shadow-sm"
        >
          <Image 
            source={{ uri: item.image }} 
            className="w-full h-44 rounded-t-xl"
            resizeMode="cover"
          />
          <View className="p-2">
            <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>{item.name}</Text>
            <Text className="text-sm text-gray-600">{item.price}</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-xs text-yellow-500">★ {item.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <Header />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Banner Carousel */}
        <View className="mt-4 px-5 rounded-md flex items-center justify-center">
        <Carousel
        loop
        width={width - 32}
        height={200}
        autoPlay={true}
        autoPlayInterval={3000}
        data={bannerData}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, resizeMode: 'cover' , borderRadius: 10}} />
        )}
      />
        </View>
        
        {/* Categories */}
        <View className="mt-2">
          <Text className="px-4 text-lg font-bold text-gray-800 mb-3">Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setActiveCategory(category.name)}
                className={`mr-4 px-4 py-2 rounded-full ${
                  activeCategory === category.name 
                    ? "bg-blue-500" 
                    : "bg-gray-200"
                }`}
              >
                <Text 
                  className={`text-sm font-medium ${
                    activeCategory === category.name 
                      ? "text-white" 
                      : "text-gray-800"
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Trending Section */}
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          className="mt-6"
        >
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">Trending Now</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          >
            {trendingProducts.map((item, index) => renderProductItem(item, index))}
          </ScrollView>
        </Animated.View>
        
        {/* New Arrivals Section */}
        <Animated.View 
          entering={FadeInDown.delay(500).springify()}
          className="mt-6"
        >
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Text className="text-lg font-bold text-gray-800">New Arrivals</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          >
            {newArrivals.map((item, index) => renderProductItem(item, index))}
          </ScrollView>
        </Animated.View>
        
        {/* Best Sellers Section */}
        <Animated.View 
          entering={FadeInDown.delay(700).springify()}
          className="mt-6 px-5">
          <View className="bg-blue-500 p-3 rounded-xl">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-white">Best Sellers</Text>
              <TouchableOpacity>
                <View className="text-black">
                  <AntDesign name="right" size={24} color="white" />
                </View>
              </TouchableOpacity>
              </View>
          </View>
          </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;