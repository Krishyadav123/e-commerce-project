import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function AppLayout() {
  const route = useRoute();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarStyle: route.name === 'profile' ? { display: 'none' } : {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      
      {/* This is a special configuration to handle the product folder */}
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null, // This makes the tab not appear in the tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="product/index"
        options={{
          href: null, // This makes the tab not appear in the tab bar
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
