import React, { useCallback, useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { AppInput, NavigationButton } from '../UI';
import { createUser } from '../database/db-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const RegisterScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = (username: String, password: String, confirmedPassword: String) => {

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

    // Validate confirmed password field
    if (!confirmedPassword) {
      validationErrors.confirmedPassword = 'Confirmed Password is required.';
    } else if (confirmedPassword.trim().length === 0) {
      validationErrors.confirmedPassword = ' Confirmed Password cannot be empty.';
    }

    // Check if password and confirmed password is the same
    if (password && confirmedPassword && password !== confirmedPassword) {
      validationErrors.differentPasswords = 'Password and Confirmed Password must be the same.';
    }

    setErrors(validationErrors);
    return (Object.keys(validationErrors).length === 0);
  }

  const _register = async () => {
    const validationErrors = validateForm(username, password, confirmedPassword);
    if (validationErrors) {
      await createUser(username, password);
      try {
        await AsyncStorage.setItem('username', username);
        Alert.alert('You are now logged in');
        navigation.navigate('Profile');
      } catch (error) {
        console.log('## ERROR SAVING ITEM ##: ', error);
      }
    } else {
      Alert.alert(
        'Errors',
        `${errors.username ? errors.username + '\n' : ''}` +
        `${errors.password ? errors.password + '\n' : ''}` +
        `${errors.confirmedPassword ? errors.confirmedPassword + '\n' : ''}` +
        `${errors.differentPasswords ? errors.differentPasswords + '\n' : ''}`
      );
    }
  };

  useEffect(() => {
    validateForm(username, password, confirmedPassword);
  }, [username, password, confirmedPassword]);

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPassword('');
      setConfirmedPassword('');
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

      <AppInput
        placeholder="Confirm Password"
        value={confirmedPassword}
        onChangeText={(input: string) => setConfirmedPassword(input)}
        secureTextEntry
      />

      <NavigationButton title='Register' onPress={_register} style={{ marginBottom: 10, }} />
      <NavigationButton title='Go to Login' onPress={() => navigation.navigate('Login')} style={{ backgroundColor: '#0c2552', }} />
    </View>
  );
}

export default RegisterScreen;