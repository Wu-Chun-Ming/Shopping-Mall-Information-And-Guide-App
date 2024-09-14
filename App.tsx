import React from 'react';
import {
  View, Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from './screens/HomeScreen';
// Shop
import ShopScreen from './screens/ShopScreen';
import ShopDetailScreen from './screens/ShopDetailScreen';
// Event
import EventScreen from './screens/EventScreen';
import EventDetailScreen from './screens/EventDetailScreen';
// User
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
// Info
import SettingsScreen from './screens/SetttingsScreen';
import ParkingInfoScreen from './screens/ParkingInfoScreen';
import MapScreen from './screens/MapScreen';
import FAQScreen from './screens/FAQScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Shop Detail'
        component={ShopDetailScreen}
      />
      <Stack.Screen
        name='Event Detail'
        component={EventDetailScreen}
      />
    </Stack.Navigator>
  );
}

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Shop'
        component={ShopScreen}
      />
      <Stack.Screen
        name='Shop Detail'
        component={ShopDetailScreen}
      />
    </Stack.Navigator>
  );
}

const EventStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Event'
        component={EventScreen}
      />
      <Stack.Screen
        name='Event Detail'
        component={EventDetailScreen}
      />
    </Stack.Navigator>
  );
}

// Custom drawer component
const CustomDrawerComponent = (props: any) => {

  const { navigation } = props;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "100%" }}>
        <View style={{
          alignItems: 'center',
          backgroundColor: '#76859c',
          flexDirection: 'row',
        }}>
          <View style={{ paddingRight: 50, paddingLeft: 10 }}>
            <TouchableWithoutFeedback onPress={() => navigation.closeDrawer()} >
              <Ionicons name="menu" size={50} />
            </TouchableWithoutFeedback>

          </View>
          <View style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 70
          }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Profile');
            }}>
              <MaterialCommunityIcons name="account-circle-outline" size={60} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>Profile</Text>
          </View>
        </View>

        {/* Drawer Items */}
        <View style={{ backgroundColor: '#fff', paddingTop: 10, height: windowHeight * .80 }}>
          <DrawerItemList {...props} />
        </View>
      </View>
    </View>
  );
}

const BottomTabNavigator = (initialRouteName: any) => {

  return (() => {
    return (
      <BottomTab.Navigator
        initialRouteName={initialRouteName + 'BottomTab'}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#b3bab5',
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}>
        <BottomTab.Screen
          name='HomeBottomTab'
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="home" size={30} color={(focused) ? '#364d2a' : 'white'} />
            ),
          }}
        />
        <BottomTab.Screen
          name='ShopBottomTab'
          component={ShopStackNavigator}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({ focused }) => (
              <FontAwesome6 name="shop" size={25} color={(focused) ? '#364d2a' : 'white'} />
            ),
          }}
        />
        <BottomTab.Screen
          name='EventBottomTab'
          component={EventStackNavigator}
          options={{
            tabBarLabel: 'Event',
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="event" size={30} color={(focused) ? '#364d2a' : 'white'} />
            ),
          }}
        />
        <BottomTab.Screen
          name='SettingsBottomTab'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="settings-outline" size={30} color={(focused) ? '#364d2a' : 'white'} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  });
}

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerComponent {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        drawerLabelStyle: {
          fontSize: 20,
        },
      }}
    >
      <Drawer.Screen
        name="XYZ Mall"
        component={BottomTabNavigator('Home')}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerItemStyle: { display: 'none', height: 0 },
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          drawerItemStyle: { display: 'none', height: 0 },
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerItemStyle: { display: 'none', height: 0 },
        }}
      />

      <Drawer.Screen
        name="Parking Info"
        component={ParkingInfoScreen}
      />
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{
          drawerLabel: 'Location',
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          headerTitle: 'FAQ',
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;