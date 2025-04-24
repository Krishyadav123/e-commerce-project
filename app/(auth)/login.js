import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link } from 'expo-router';
import { auth } from '../../services/firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [fromRegistration, setFromRegistration] = useState(false);

  // Check if coming from registration
  useEffect(() => {
    const checkRegistrationParams = async () => {
      // This would check for route params if you're passing data during navigation
      // For demo purposes we're just ensuring any existing session is cleared
      try {
        await signOut(auth);
      } catch (e) {
        console.log("Sign out error:", e);
      }
    };
    
    checkRegistrationParams();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newFieldErrors = { email: '', password: '' };
    
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
    
    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const handleLogin = async () => {
    // Clear previous errors
    setError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Add a small delay to ensure Firebase account is fully created and propagated
      // This helps when coming directly from registration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential.user.email);
      // Successful login - router will handle navigation
    } catch (e) {
      console.log("Login error:", e.code, e.message);
      
      // Handle Firebase errors
      let errorMessage = 'Login failed. Please try again.';
      
      // Map Firebase error codes to user-friendly messages
      if (e.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address';
      } else if (e.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (e.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please check your email and password.';
      } else if (e.code === 'auth/too-many-requests') {
        errorMessage = 'Too many login attempts. Please try again later.';
      } else if (e.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (e.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
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
        <View className="bg-blue-600 h-60 rounded-b-3xl justify-end pb-12">
          <Text className="text-white text-2xl font-bold text-center">Login To TechGadget</Text>
          <Text className="text-white text-center opacity-80">Premium Electronics Store</Text>
        </View>
        
        {/* Login form card */}
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
                    if (error) setError('');
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
                  placeholder="Your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (fieldErrors.password) {
                      setFieldErrors({...fieldErrors, password: ''});
                    }
                    if (error) setError('');
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
            
            {/* <TouchableOpacity>
              <Text className="text-blue-600 text-right font-medium">Forgot Password?</Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity
              className={`p-2 rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-bold text-md">Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="flex-row justify-center mt-6 mb-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/register">
            <Text className="text-blue-600 font-bold">Create Account</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}