import React from 'react';
import { View, Text } from 'react-native';

const ParkingInfoScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Parking Information</Text>
      <Text style={{ marginTop: 10 }}>
        Parking is available in the basement levels B1 to B3. 
        Our parking facilities are open 24/7, and the parking rates are as follows:
      </Text>
      <Text style={{ marginTop: 10 }}>
        - First 2 hours: Free{'\n'}
        - Every additional hour: $2{'\n'}
        - Maximum daily rate: $15
      </Text>
      <Text style={{ marginTop: 10 }}>
        Parking spaces are available for both regular vehicles and electric vehicles.
        EV charging stations are located on level B2.
      </Text>
      <Text style={{ marginTop: 10 }}>
        We also offer valet parking services from 9 AM to 10 PM daily. 
        Valet parking is located at the main entrance.
      </Text>
    </View>
  );
}

export default ParkingInfoScreen;