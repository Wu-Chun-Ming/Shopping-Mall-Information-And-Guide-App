import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

interface LoginScreenProps {
  navigation: StackNavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  
  const { setUser } = authContext;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Username and password are required.');
      return;
    }

    setIsLoading(true);

    const ws = new WebSocket('ws://your-websocket-server.com/login');

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'login', username, password }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.success) {
        setUser(response.user);
        navigation.navigate('ShopScreen');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
      setIsLoading(false);
    };

    ws.onerror = (e) => {
      console.error('WebSocket Error:', e.message);
      Alert.alert('Connection Error', 'Could not connect to the server.');
      setIsLoading(false);
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={isLoading ? 'Logging In...' : 'Login'} onPress={login} disabled={isLoading} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});
