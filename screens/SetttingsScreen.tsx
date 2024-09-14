import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableNativeFeedback, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ParkingInfoScreen from './ParkingInfoScreen';
import MapScreen from './MapScreen';
import FAQScreen from './FAQScreen';
import ContactUsScreen from './ContactUsScreen';
import AboutUsScreen from './AboutUsScreen';

const Stack = createStackNavigator();

const navigatePages = [
    { name: 'Profile', page: 'Profile' },
    { name: 'Parking Info', page: 'ParkingInfoStack' },
    { name: 'Location', page: 'MapStack' },
    { name: 'Frequently Asked Questions (FAQ)', page: 'FAQStack' },
    { name: 'Contact Us', page: 'ContactUsStack' },
    { name: 'About Us', page: 'AboutUsStack' }
];

const SettingsScreen = ({ route, navigation }: any) => {
    return (
        <View>
            <FlatList
                data={navigatePages}
                keyExtractor={(item) => item.name}
                renderItem={({ item }: any) => (
                    <View style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: '#787160',
                        padding: 10,
                    }}>
                        <TouchableNativeFeedback onPress={() => navigation.navigate(item.page)}
                            style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ flex: 1, fontSize: 30, }}>{item.name}</Text>
                                <AntDesign name='right' size={30} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>)}>
            </FlatList>
        </View>
    );
};

const App = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SettingsStack"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                }}
            />

            {/* Information */}
            <Stack.Screen
                name="ParkingInfoStack"
                component={ParkingInfoScreen}
                options={{
                    headerTitle: 'Parking Info',
                }}
            />
            <Stack.Screen
                name="MapStack"
                component={MapScreen}
                options={{
                    headerTitle: 'Map',
                }}
            />
            <Stack.Screen
                name="FAQStack"
                component={FAQScreen}
                options={{
                    headerTitle: 'FAQ',
                }}
            />
            <Stack.Screen
                name="ContactUsStack"
                component={ContactUsScreen}
                options={{
                    headerTitle: 'Contact Us',
                }}
            />
            <Stack.Screen
                name="AboutUsStack"
                component={AboutUsScreen}
                options={{
                    headerTitle: 'About Us',
                }}
            />
        </Stack.Navigator>
    );
}

export default App;