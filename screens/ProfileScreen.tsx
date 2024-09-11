import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../App';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    // Clear user authentication state
    setUser(null);
    // Navigate back to the Home or Login page
    navigation.navigate('Home');
  };

  if (!user) {
    // If the user is not logged in, show a message and a button to go to the login page
    return (
      <View>
        <Text>You are not logged in!</Text>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome, {user.username}!</Text> {/* Display user's name or email */}
      <Text>Email: {user.email}</Text> {/* Display user's email */}

      {/* Add other profile information or settings here */}
      
      <Button title="Logout" onPress={logout} />
    </View>
  );
}