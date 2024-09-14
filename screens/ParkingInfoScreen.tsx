import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParkingInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Information</Text>
      <Text style={styles.paragraph}>
        Parking is available in the basement levels B1 to B3. 
        Our parking facilities are open 24/7, and the parking rates are as follows:
      </Text>
      <Text style={styles.parkingRates}>
        - First 2 hours: Free{'\n'}
        - Every additional hour: $2{'\n'}
        - Maximum daily rate: $15
      </Text>
      <Text style={styles.paragraph}>
        Parking spaces are available for both regular vehicles and electric vehicles.
        EV charging stations are located on level B2.
      </Text>
      <Text style={styles.paragraph}>
        We also offer valet parking services from 9 AM to 10 PM daily. 
        Valet parking is located at the main entrance.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6dabad',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#040f0f',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 20,
    color: '#280c38',
    marginBottom: 15,
    textAlign: 'justify',
  },
  parkingRates: {
    fontSize: 20,
    color: '#e8e227',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#415d61',
    padding: 10,
    borderRadius: 8,
  },
});

export default ParkingInfoScreen;