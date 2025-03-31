import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
import { Link, router } from 'expo-router';
import { auth } from '../../services/firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">Register</Text>
      
      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}
      
      <View className="space-y-4">
        <TextInput
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TextInput
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">Register</Text>
          )}
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-4">
          <Text>Already have an account? </Text>
          <Link href="/(auth)/login" className="text-blue-500">Login</Link>
        </View>
      </View>
    </View>
  );
}
