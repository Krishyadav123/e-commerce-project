import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, router } from 'expo-router';
import { auth } from '../../services/firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newFieldErrors = { email: '', password: '', confirmPassword: '' };
    
    // Email validation
    if (!email.trim()) {
      newFieldErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFieldErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Password validation
    if (!password) {
      newFieldErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newFieldErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newFieldErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newFieldErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const handleRegister = async () => {
    // Clear previous errors
    setError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/login')
      // Successful registration - router will handle navigation
    } catch (e) {
      // Handle Firebase errors
      let errorMessage = 'Registration failed. Please try again.';
      
      // Map Firebase error codes to user-friendly messages
      if (e.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (e.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      } else if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 bg-gray-50">
        {/* Header with gradient background */}
        <View className="bg-blue-600 h-52 rounded-b-3xl justify-end pb-12">
          <Text className="text-white text-2xl font-bold text-center">Register To TechGadget</Text>
          <Text className="text-white text-center opacity-80">Premium Electronics Store</Text>
        </View>
        
        {/* Registration form card */}
        <View className="mx-5 -mt-10 bg-white rounded-2xl p-6 shadow-lg">
          
          {error ? (
            <View className="bg-red-50 p-3 rounded-lg mb-4 flex-row items-center">
              <MaterialIcons name="error-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 ml-2">{error}</Text>
            </View>
          ) : null}
          
          <View className="space-y-5">
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-gray-50">
                <MaterialIcons name="email" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 p-3 text-gray-800"
                  placeholder="Your email address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (fieldErrors.email) {
                      setFieldErrors({...fieldErrors, email: ''});
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {fieldErrors.email ? (
                <Text className="text-red-500 text-sm mt-1">{fieldErrors.email}</Text>
              ) : null}
            </View>
            
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-gray-50">
                <MaterialIcons name="lock" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 p-3 text-gray-800"
                  placeholder="Create a password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (fieldErrors.password) {
                      setFieldErrors({...fieldErrors, password: ''});
                    }
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
              {fieldErrors.password ? (
                <Text className="text-red-500 text-sm mt-1">{fieldErrors.password}</Text>
              ) : null}
            </View>
            
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Confirm Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-gray-50">
                <MaterialIcons name="lock" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 p-3 text-gray-800"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (fieldErrors.confirmPassword) {
                      setFieldErrors({...fieldErrors, confirmPassword: ''});
                    }
                  }}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <MaterialIcons 
                    name={showConfirmPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
              {fieldErrors.confirmPassword ? (
                <Text className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</Text>
              ) : null}
            </View>
            
            <TouchableOpacity
              className={`p-2 rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-bold text-md">Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="flex-row justify-center mt-6 mb-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login">
            <Text className="text-blue-600 font-bold">Login</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}