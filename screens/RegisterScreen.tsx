import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    const ws = new WebSocket('ws://your-websocket-server.com/register');

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'register', username, password }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.success) {
        alert('Registration successful! Please log in.');
        navigation.navigate('Login');
      } else {
        alert('Registration failed');
      }
    };

    ws.onerror = (e) => {
      console.error('WebSocket Error:', e.message);
    };
  };

  return (
    <View>
      <Text>Register</Text>
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
      <Button title="Register" onPress={register} />
    </View>
  );
}