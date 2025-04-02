import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FollowUsSection() {
  // You would replace these placeholder images with your actual images
  const socialImages = [
    { 
      id: 1, 
      username: '@mia', 
      uri: 'https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg'
    },
    { 
      id: 2, 
      username: '@_jihyn', 
      uri: 'https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg'
    },
    { 
      id: 3, 
      username: '@mia', 
      uri: 'https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg'
    },
    { 
      id: 4, 
      username: '@_jihyn', 
      uri: 'https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg'
    }
  ];

  // Helper function for the divider
  const Divider = () => (
    <View className="flex-row items-center justify-center w-full my-5">
      <View className="h-px bg-gray-300 flex-1" />
      <View className="w-2 h-2 mx-2 bg-white border border-gray-300 rotate-45" />
      <View className="h-px bg-gray-300 flex-1" />
    </View>
  );

  return (
    <View className="bg-white pt-4">
      <View className="px-4 pt-4">
        {/* Follow Us Header */}
        <Text className="text-center text-lg font-medium tracking-widest mb-2">FOLLOW US</Text>
        
        {/* Instagram Icon */}
        <View className="items-center mb-4">
          <TouchableOpacity>
            <Ionicons name="logo-instagram" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        {/* Gallery Grid */}
        <View className="h-full grid grid-cols-2 gap-4 mb-6">
          {socialImages.map((image, index) => (
            <View key={image.id} className="w-[48%] h-full relative">
              <Image 
                source={{ uri: image.uri }}
                className="w-full h-40 rounded-lg"
                style={{ borderRadius: 2 }}
              />
              <View className="">
                <Text className="text-black text-center text-sm font-medium">{image.username}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Social Media Icons */}
        <View className="flex-row justify-center mb-4 gap-4 my-6">
          <TouchableOpacity>
            <Ionicons name="logo-twitter" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-instagram" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-youtube" size={22} color="black" />
          </TouchableOpacity>
        </View>
        
        {/* First Divider */}
        {/* <Divider /> */}
        
        {/* Contact Information */}
        <View className="items-center mb-6">
          <Text className="text-center text-gray-700 mb-1">support@openui.design</Text>
          <Text className="text-center text-gray-700 mb-1">+60 825 876</Text>
          <Text className="text-center text-gray-700">08:00 - 22:00 - Everyday</Text>
        </View>
        
        {/* Second Divider */}
        <Divider />
        
        {/* Footer Navigation */}
        <View className="flex-row justify-center space-x-8 mb-6">
          <TouchableOpacity>
            <Text className="text-gray-800">About</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-800">Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-800">Blog</Text>
          </TouchableOpacity>
        </View>
        
        {/* Copyright */}
        <Text className="text-center text-xs text-gray-500 mb-4">
          Copyright© OpenUI All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}