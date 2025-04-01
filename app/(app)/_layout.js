// // app/(app)/_layout.js
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { BlurView } from 'expo-blur';
// import Animated, { FadeInDown } from 'react-native-reanimated';
// import { View } from 'react-native';

// export default function AppLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           position: 'absolute',
//           bottom: 20,
//           left: 20,
//           right: 20,
//           elevation: 0,
//           borderRadius: 15,
//           height: 60,
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           borderTopWidth: 0,
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 5,
//           },
//           shadowOpacity: 0.1,
//           shadowRadius: 10,
//         },
//         tabBarLabelStyle: {
//           fontWeight: '600',
//           fontSize: 12,
//         },
//         tabBarBackground: () => (
//           <BlurView tint="light" intensity={30} style={{ flex: 1, borderRadius: 15 }} />
//         ),
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <Animated.View
//               entering={FadeInDown.delay(100).springify()}
//             >
//               <Ionicons
//                 name={focused ? 'home' : 'home-outline'}
//                 size={24}
//                 color={color}
//               />
//             </Animated.View>
//           ),
//           tabBarActiveTintColor: '#007AFF',
//         }}
//       />
//       <Tabs.Screen
//         name="search"
//         options={{
//           title: 'Search',
//           tabBarIcon: ({ color, focused }) => (
//             <Animated.View
//               entering={FadeInDown.delay(200).springify()}
//             >
//               <Ionicons
//                 name={focused ? 'search' : 'search-outline'}
//                 size={24}
//                 color={color}
//               />
//             </Animated.View>
//           ),
//           tabBarActiveTintColor: '#007AFF',
//         }}
//       />
//       <Tabs.Screen
//         name="categories"
//         options={{
//           title: 'Categories',
//           tabBarIcon: ({ color, focused }) => (
//             <Animated.View
//               entering={FadeInDown.delay(300).springify()}
//             >
//               <Ionicons
//                 name={focused ? 'grid' : 'grid-outline'}
//                 size={24}
//                 color={color}
//               />
//             </Animated.View>
//           ),
//           tabBarActiveTintColor: '#007AFF',
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarIcon: ({ color, focused }) => (
//             <Animated.View
//               entering={FadeInDown.delay(400).springify()}
//             >
//               <Ionicons
//                 name={focused ? 'cart' : 'cart-outline'}
//                 size={24}
//                 color={color}
//               />
//             </Animated.View>
//           ),
//           tabBarActiveTintColor: '#007AFF',
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, focused }) => (
//             <Animated.View
//               entering={FadeInDown.delay(500).springify()}
//             >
//               <Ionicons
//                 name={focused ? 'person' : 'person-outline'}
//                 size={24}
//                 color={color}
//               />
//             </Animated.View>
//           ),
//           tabBarActiveTintColor: '#007AFF',
//         }}
//       />
//     </Tabs>
//   );
// }
