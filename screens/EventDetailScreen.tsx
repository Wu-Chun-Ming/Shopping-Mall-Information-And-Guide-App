import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { fetchEventById, getDBConnection } from '../database/db-service';
import { getEventImageSource } from './images';

const EventDetailScreen = ({ route, navigation }: any) => {

  const { width, height } = Dimensions.get('window');
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);

  // Load event detail from database by event id
  const loadEventDetail = async () => {
    // const event = await fetchEventById(eventId);
    const event = await fetchEventById(await getDBConnection(), eventId);
    setEvent(event);
  };

  useEffect(() => {
    loadEventDetail();
  }, []);

  // If event detail is not loaded
  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={80} color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{
      flex: 1, padding: 10,
      // padding: 20, justifyContent: 'center', alignItems: 'center'
    }}>
      {/* {!event &&
        <View>
          <Text style={{ fontSize: 25, color: 'red' }}>Couldn't connect to the server.</Text>
          <View>
            <Button title='reload' onPress={() => {
              //   socketLab.emit('client_send');
              loadEventDetail();
              // if (events.length === 0) {
              if (!event) {
                Alert.alert('Please try again later.')
              }
            }}
            />
          </View>
        </View>} */}
      <Text>
        <Text style={styles.label}>Event Name: </Text>
        {event.name.toUpperCase()}
      </Text>
      <Text>
        <Text style={styles.label}>Date: </Text>
        {event.date}
      </Text>
      <Text>
        <Text style={styles.label}>Location: </Text>
        {event.location}
      </Text>
      <Text style={{ textAlign: 'justify' }}>
        <Text style={styles.label}>Description: </Text>
        {event.description}
      </Text>
      <Image
        source={getEventImageSource(event.id)}
        style={{
          width: width,
          height: height * 0.4,
          resizeMode: 'contain',
        }}
      />

      {/* Button to view map or navigate to location */}
      {/* <Button title="View Map" onPress={() => navigation.navigate('Map', { location: event.location })} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventDetailScreen;