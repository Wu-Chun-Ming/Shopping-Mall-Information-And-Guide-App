import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { fetchEventById } from '../server/eventService';

export default function EventDetail({ route, navigation }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    loadEventDetail();
  }, []);

  const loadEventDetail = () => {
    fetchEventById(eventId, (eventDetail) => {
      setEvent(eventDetail);
    });
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Event Name: {event.name}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Description: {event.description}</Text>

      {/* Button to view map or navigate to location */}
      <Button title="View Map" onPress={() => navigation.navigate('Map', { location: event.location })} />
    </View>
  );
}