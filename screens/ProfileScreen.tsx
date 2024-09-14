import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { AppInput, NavigationButton } from '../UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser, updateUserPassword } from '../database/db-service';

const ProfileScreen = ({ route, navigation }: any) => {
  const [user, setUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Auto login
  const autoLogin = async () => {
    try {
      let username = await AsyncStorage.getItem('username');
      if (username !== null) {
        console.log('setting username');
      }
    } catch (error) {
      console.log('## ERROR READING ITEM ##: ', error);
    }
  }
  // Update Password
  const _updatePassword = async () => {
    await updateUserPassword(user, newPassword);
    setNewPassword('');
    Alert.alert('Your password has been updated');
  }

  // Logout
  const _logout = async () => {
    try {
      await AsyncStorage.setItem('username', '');
      setUser('');
      Alert.alert('You are now logged out');
      navigation.navigate('Home');  // Navigate back to the Home page
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  };

  // Delete Account
  const _deleteAccount = async () => {
    await deleteUser(user);
    await AsyncStorage.setItem('username', '');
    setUser('');
    Alert.alert('Your account has been deleted');
  }

  useEffect(() => {
    autoLogin();
  }, [])

  // If the user is not logged in, show a message and a button to go to the login page
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10, }}>
        <View style={{ alignItems: 'center', }}>
          <Text style={{ fontSize: 30 }}>You are not logged in!</Text>
        </View>
        <NavigationButton title='Go to Login' onPress={() => navigation.navigate('Login')} />
      </View>);
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10, }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, }}>Welcome, {user}!</Text>
        </View>

        <AppInput
          label='New Password'
          placeholder='New Password'
          orientation='horizontal'
          value={newPassword}
          onChangeText={(input: string) => setNewPassword(input)}
          secureTextEntry
        />
        <NavigationButton title="Update Password" onPress={_updatePassword} style={{ marginBottom: 10, }} />
        <NavigationButton title="Logout" onPress={_logout} style={{ marginBottom: 10, }} />
        <NavigationButton title="Delete Account" onPress={_deleteAccount} style={{ backgroundColor: '#b01515' }} />
      </View>);
  }
}

export default ProfileScreen;