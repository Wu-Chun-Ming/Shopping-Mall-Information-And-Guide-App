import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connectWebSocket, fetchEvents } from '../server/eventService';

export default function EventScreen() {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    connectWebSocket(); // Connect to the WebSocket when the component mounts
    loadEvents();
  }, []);

  const loadEvents = () => {
    fetchEvents((fetchedEvents) => {
      setEvents(fetchedEvents);
    });
  };

  return (
    <View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}