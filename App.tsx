import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import EventScreen from './screens/EventScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopDetail from './screens/ShopDetail';
import EventDetail from './screens/EventDetail';
import QnAScreen from './screens/QnAScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ParkingInfoScreen from './screens/ParkingInfoScreen';

// Define types for the user and AuthContext
interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Drawer = createDrawerNavigator();

// Define context with the appropriate type
export const AuthContext = createContext<AuthContextType | null>(null);

// Initialize or create the database tables
const createShopsTable = () => {
  console.log('Shops table creation logic here');
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    createShopsTable();  // Initialize the database and create tables
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

export default App;
