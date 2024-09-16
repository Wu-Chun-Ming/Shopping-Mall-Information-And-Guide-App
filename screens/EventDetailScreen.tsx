import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator } from 'react-native';
import { fetchEventById, getDBConnection } from '../database/db-service';
import { getEventImageSource } from '../images';

const EventDetailScreen = ({ route }: any) => {

  const { width, height } = Dimensions.get('window');
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);

  // Load event detail from database by event id
  const loadEventDetail = async () => {
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
    <ScrollView style={{ flex: 1, padding: 10, }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        <Text>{event.name.toUpperCase()}</Text>
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