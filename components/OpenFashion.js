import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Svg, Path, Rect, Circle } from 'react-native-svg';

// Custom icons using SVG to match the design exactly
const ShippingIcon = () => (
  <Svg height="28" width="28" viewBox="0 0 24 24">
    <Path d="M7,19 L5,19 L5,12 L2,5 L22,5 L19,12 L19,19 L17,19" stroke="#333" strokeWidth="1.5" fill="none" />
    <Circle cx="9" cy="19" r="2" stroke="#333" strokeWidth="1.5" fill="none" />
    <Circle cx="15" cy="19" r="2" stroke="#333" strokeWidth="1.5" fill="none" />
    <Path d="M3,7 L21,7" stroke="#333" strokeWidth="1.5" />
  </Svg>
);

const SustainableIcon = () => (
  <Svg height="28" width="28" viewBox="0 0 24 24">
    <Path d="M12,3 L12,8 C12,9.1 12.9,10 14,10 L18,10" stroke="#333" strokeWidth="1.5" fill="none" />
    <Path d="M18,8 L12,14 L9,11 L4,16" stroke="#333" strokeWidth="1.5" fill="none" />
    <Path d="M12,20 C15.866,20 19,16.866 19,13 C19,11.505 18.5,10.1 17.652,9 L14,9 L14,5.348 C12.9,4.5 11.495,4 10,4 C6.134,4 3,7.134 3,11 C3,14.866 6.134,18 10,18" stroke="#333" strokeWidth="1.5" fill="none" />
  </Svg>
);

const DesignIcon = () => (
  <Svg height="28" width="28" viewBox="0 0 24 24">
    <Path d="M4,3 L20,3 L20,21 L4,21 L4,3 Z" stroke="#333" strokeWidth="1.5" fill="none" />
    <Path d="M9,8 L15,8" stroke="#333" strokeWidth="1.5" />
    <Path d="M6,13 L18,13" stroke="#333" strokeWidth="1.5" />
    <Path d="M9,18 L15,18" stroke="#333" strokeWidth="1.5" />
  </Svg>
);

const HeartIcon = () => (
  <Svg height="28" width="28" viewBox="0 0 24 24">
    <Path d="M12,21 L10.55,19.7C5.4,15.1 2,12.1 2,8.5C2,5.5 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.09C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.5 22,8.5C22,12.1 18.6,15.1 13.45,19.7L12,21Z" stroke="#333" strokeWidth="1.5" fill="none" />
    <Path d="M12,12 L16,8" stroke="#333" strokeWidth="1.5" />
    <Path d="M8,9 L10,11" stroke="#333" strokeWidth="1.5" />
  </Svg>
);

const DecorativeDivider = () => (
  <View className="flex-row items-center justify-center w-full my-5">
    <View className="h-px bg-gray-300 flex-1" />
    <View className="w-2 h-2 mx-2 bg-gray-50 border border-gray-300 rotate-45" />
    <View className="h-px bg-gray-300 flex-1" />
  </View>
);

const BottomDecoration = () => (
  <Svg height="24" width="60" viewBox="0 0 60 24">
    <Path 
      d="M2,12 C10,6 20,18 30,12 C40,6 50,18 58,12" 
      stroke="#C0C0C0" 
      strokeWidth="1" 
      fill="none" 
    />
  </Svg>
);

export default function OpenFashionComponent() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Blue top border */}
      <View className="h-1 bg-blue-500 w-full" />
      
      <ScrollView className="flex-1">
        <View className="px-5 py-8">
          {/* Logo/Brand Name */}
          <View className="items-center mb-4">
            <Text className="text-3xl font-light text-gray-800 leading-8">Open</Text>
            <Text className="text-3xl font-medium text-gray-800 leading-8">Fashion</Text>
          </View>

          {/* Tagline */}
          <Text className="text-center text-gray-700 mb-4 px-6 leading-6">
            Making a luxurious lifestyle accessible for a generous group of women is our daily drive.
          </Text>

          {/* Decorative Divider */}
          <DecorativeDivider />

          {/* Features Grid */}
          <View className="grid grid-cols-2 gap-4 mt-4">
            {/* Feature 1 */}
            <View className="w-[48%] items-center mb-8">
              <View className="h-12 w-12 items-center justify-center mb-2">
                <ShippingIcon />
              </View>
              <Text className="text-center text-gray-600 text-sm leading-5">
                Fast shipping. Free on orders over $25.
              </Text>
            </View>

            {/* Feature 2 */}
            <View className="w-[48%] items-center mb-8">
              <View className="h-12 w-12 items-center justify-center mb-2">
                <SustainableIcon />
              </View>
              <Text className="text-center text-gray-600 text-sm leading-5">
                Sustainable process from start to finish.
              </Text>
            </View>

            {/* Feature 3 */}
            <View className="w-[48%] items-center mb-8">
              <View className="h-12 w-12 items-center justify-center mb-2">
                <DesignIcon />
              </View>
              <Text className="text-center text-gray-600 text-sm leading-5">
                Unique designs and high-quality materials.
              </Text>
            </View>

            {/* Feature 4 */}
            <View className="w-[48%] items-center mb-8">
              <View className="h-12 w-12 items-center justify-center mb-2">
                <HeartIcon />
              </View>
              <Text className="text-center text-gray-600 text-sm leading-5">
                Fast shipping. Free on orders over $25.
              </Text>
            </View>
          </View>

          {/* Bottom Decorative Element */}
          <View className="items-center mt-2 mb-4">
            <BottomDecoration />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}