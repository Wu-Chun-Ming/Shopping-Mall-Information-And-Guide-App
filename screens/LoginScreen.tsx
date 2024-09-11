import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../App';

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const ws = new WebSocket('ws://your-websocket-server.com/login');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'login', username, password }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.success) {
        setUser(response.user); // Set the user context to logged-in user
        navigation.navigate('ShopScreen');
      } else {
        alert('Login failed');
      }
    };

    ws.onerror = (e) => {
      console.error('WebSocket Error:', e.message);
    };
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}