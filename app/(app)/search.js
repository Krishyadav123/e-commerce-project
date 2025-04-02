import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'summer dress', 'men\'s shoes', 'wireless headphones', 'smartwatch'
  ]);
  
  const popularSearches = [
    'phone accessories', 'women\'s tops', 'running shoes', 'bluetooth speakers',
    'backpacks', 'sunglasses', 'smart home', 'kitchen gadgets'
  ];
  
  const searchResults = [
    { id: 1, name: 'Wireless Earbuds', price: '$89.99', image: 'https://via.placeholder.com/400x500/9C27B0/FFFFFF?text=Earbuds', rating: 4.7 },
    { id: 2, name: 'Smart Watch Pro', price: '$249.99', image: 'https://via.placeholder.com/400x500/009688/FFFFFF?text=Smart+Watch', rating: 4.8 },
    { id: 3, name: 'Bluetooth Speaker', price: '$59.99', image: 'https://via.placeholder.com/400x500/FF5722/FFFFFF?text=Speaker', rating: 4.5 },
    { id: 4, name: 'Noise Cancelling Headphones', price: '$179.99', image: 'https://via.placeholder.com/400x500/3F51B5/FFFFFF?text=Headphones', rating: 4.9 },
    { id: 5, name: 'Wireless Charger', price: '$39.99', image: 'https://via.placeholder.com/400x500/607D8B/FFFFFF?text=Charger', rating: 4.6 },
    { id: 6, name: 'Fitness Tracker', price: '$79.99', image: 'https://via.placeholder.com/400x500/4CAF50/FFFFFF?text=Fitness+Tracker', rating: 4.4 },
  ];
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Simulating adding to recent searches
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches].slice(0, 5));
    }
  };
  
  const renderSearchResult = ({ item }) => {
    return (
      <TouchableOpacity 
        onPress={() => router.push(`/product/${item.id}`)}
        className="flex-row p-4 border-b border-gray-200"
      >
        <Image 
          source={{ uri: item.image }} 
          className="w-20 h-20 rounded"
          resizeMode="cover"
        />
        <View className="ml-3 flex-1 justify-center">
          <Text className="text-base font-medium text-gray-800">{item.name}</Text>
          <Text className="text-sm text-gray-600 mt-1">{item.price}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-yellow-500">★ {item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View className="flex-1 bg-white">
      {/* Header with back button and search input */}
      <View className="pt-12 px-4 pb-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Text className="text-xl">←</Text>
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={handleSearch}
              returnKeyType="search"
              autoFocus
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text className="text-gray-400">✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity onPress={() => router.push('/filter')} className="ml-2">
            <Text className="text-xl">⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Content based on search status */}
      {searchQuery ? (
        <Animated.FlatList
          entering={FadeIn}
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView className="flex-1">
          {/* Recent Searches */}
          <View className="px-4 py-4 border-b border-gray-100">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-bold text-gray-800">Recent Searches</Text>
              {recentSearches.length > 0 && (
                <TouchableOpacity onPress={() => setRecentSearches([])}>
                  <Text className="text-blue-500 text-sm">Clear</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-row flex-wrap">
              {recentSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleSearch(search)}
                  className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2"
                >
                  <Text className="text-gray-800">{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Popular Searches */}
          <View className="px-4 py-4">
            <Text className="text-base font-bold text-gray-800 mb-2">Popular Searches</Text>
            <View className="flex-row flex-wrap">
              {popularSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleSearch(search)}
                  className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2"
                >
                  <Text className="text-gray-800">{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;