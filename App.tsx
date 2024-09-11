import React, { useState, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import EventScreen from './screens/EventScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopDetails from './screens/ShopDetail';
import EventDetails from './screens/EventDetail';
import QnAScreen from './screens/QnAScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ParkingInfoScreen from './screens/ParkingInfoScreen';

const Drawer = createDrawerNavigator();

// Create a context for managing user authentication
export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null); // User state for login/logout

  useEffect(() => {
    // createShopsTable();  // Initialize the database and create tables
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="ShopScreen" component={ShopScreen} />
          <Drawer.Screen name="EventScreen" component={EventScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Q&A" component={QnAScreen} />
          <Drawer.Screen name="About Us" component={AboutUsScreen} />
          <Drawer.Screen name="Parking Info" component={ParkingInfoScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}