import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown, SlideOutDown, FadeIn } from 'react-native-reanimated';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSlider from "@ptomasroos/react-native-multi-slider"

const FilterScreen = () => {
  const router = useRouter();
  
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState(['Electronics']);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [onSale, setOnSale] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  
  const categories = [
    'All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports', 'Toys'
  ];
  
  const brands = [
    'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'H&M', 'Zara', 'Philips'
  ];
  
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Green', code: '#00FF00' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Grey', code: '#808080' },
    { name: 'Brown', code: '#A52A2A' },
  ];
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  const toggleColor = (color) => {
    if (selectedColors.includes(color.name)) {
      setSelectedColors(selectedColors.filter(c => c !== color.name));
    } else {
      setSelectedColors([...selectedColors, color.name]);
    }
  };
  
  const applyFilters = () => {
    // Logic to apply filters would go here
    // For now, just navigate back
    router.back();
  };
  
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setInStock(true);
    setOnSale(false);
    setFreeShipping(false);
  };
  
  return (
    <Animated.View 
      entering={SlideInDown}
      exiting={SlideOutDown}
      className="flex-1 bg-white"
    >
      {/* Header */}
      <View className="pt-12 px-4 pb-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-xl">✕</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Filters</Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text className="text-blue-500">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1 p-4">
        {/* Price Range */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-4">Price Range</Text>
          <View className="items-center">
            <MultiSlider
              values={priceRange}
              onValuesChange={setPriceRange}
              min={0}
              max={1000}
              step={10}
              sliderLength={350}
              selectedStyle={{ backgroundColor: '#3b82f6' }}
              markerStyle={{ backgroundColor: '#3b82f6', height: 20, width: 20 }}
            />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-gray-600">${priceRange[0]}</Text>
            <Text className="text-gray-600">${priceRange[1]}</Text>
          </View>
        </View>
        
        {/* Categories */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-4">Categories</Text>
          <View className="flex-row flex-wrap">
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => toggleCategory(category)}
                className={`mr-2 mb-2 px-3 py-2 rounded-lg ${
                  selectedCategories.includes(category) 
                    ? "bg-blue-500" 
                    : "bg-gray-100"
                }`}
              >
                <Text 
                  className={
                    selectedCategories.includes(category)
                      ? "text-white"
                      : "text-gray-800"
                  }
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Brands */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-4">Brands</Text>
          <View className="flex-row flex-wrap">
            {brands.map((brand, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => toggleBrand(brand)}
                className={`mr-2 mb-2 px-3 py-2 rounded-lg ${
                  selectedBrands.includes(brand) 
                    ? "bg-blue-500" 
                    : "bg-gray-100"
                }`}
              >
                <Text 
                  className={
                    selectedBrands.includes(brand)
                      ? "text-white"
                      : "text-gray-800"
                  }
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Colors */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-4">Colors</Text>
          <View className="flex-row flex-wrap">
            {colors.map((color, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => toggleColor(color)}
                className="mr-4 mb-4 items-center"
              >
                <View 
                  className={`w-10 h-10 rounded-full mb-1 border ${
                    selectedColors.includes(color.name) 
                      ? "border-blue-500 border-2" 
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.code }}
                />
                <Text className="text-xs text-gray-600">{color.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Additional Options */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-4">Options</Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800">In Stock Only</Text>
              <Switch
                value={inStock}
                onValueChange={setInStock}
                trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                thumbColor={inStock ? "#3B82F6" : "#F9FAFB"}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800">On Sale</Text>
              <Switch
                value={onSale}
                onValueChange={setOnSale}
                trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                thumbColor={onSale ? "#3B82F6" : "#F9FAFB"}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800">Free Shipping</Text>
              <Switch
                value={freeShipping}
                onValueChange={setFreeShipping}
                trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
                thumbColor={freeShipping ? "#3B82F6" : "#F9FAFB"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity 
          onPress={applyFilters}
          className="bg-blue-500 rounded-lg py-3 items-center"
        >
          <Text className="text-white font-bold text-base">Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default FilterScreen;