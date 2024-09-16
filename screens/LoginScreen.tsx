import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { AppInput, NavigationButton } from '../UI';
import { getUserDetail } from '../database/db-service';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = (username: String, password: String) => {

    let validationErrors = {};

    // Validate username field
    if (!username) {
      validationErrors.username = 'Username is required.';
    } else if (username.trim().length === 0) {
      validationErrors.username = 'Username cannot be empty.';
    }

    // Validate password field
    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (password.trim().length === 0) {
      validationErrors.password = 'Password cannot be empty.';
    }

    setErrors(validationErrors);
    return (Object.keys(validationErrors).length === 0);
  }

  const _login = async () => {
    const validationErrors = validateForm(username, password);
    if (validationErrors) {
      const user = await getUserDetail(username);
      if (user) {
        try {
          await AsyncStorage.setItem('username', user.username);
          Alert.alert('You are now logged in.');
          navigation.navigate('Profile');
        } catch (error) {
          console.log('## ERROR SAVING ITEM ##: ', error);
        }
      } else {
        Alert.alert('Username has not been registered.');
      }
    } else {
      Alert.alert(
        'Errors',
        `${errors.username ? errors.username + '\n' : ''}` +
        `${errors.password ? errors.password + '\n' : ''}`
      );
    }
  };

  useEffect(() => {
    validateForm(username, password);
  }, [username, password]);

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPassword('');
    }, [navigation])
  )

  return (
    <View style={{ padding: 10, }}>
      <AppInput
        placeholder="Username"
        value={username}
        onChangeText={(input: string) => setUsername(input)}
      />

      <AppInput
        placeholder="Password"
        value={password}
        onChangeText={(input: string) => setPassword(input)}
        secureTextEntry
      />

      <NavigationButton title="Login" onPress={_login} style={{ marginBottom: 10, }} />
      <NavigationButton title='Go to Register' onPress={() => navigation.navigate('Register')} style={{ backgroundColor: '#0c2552', }} />
    </View>
  );
}

export default LoginScreen;