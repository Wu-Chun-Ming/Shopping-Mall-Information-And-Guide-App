import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connectWebSocket, fetchEvents } from '../server/eventService';

// Define the event structure
interface Event {
  id: number;
  name: string;
  date: string;
}

// Define the navigation type
type RootStackParamList = {
  EventDetail: { eventId: number };
};

type EventScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventDetail'
>;

export default function EventScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigation = useNavigation<EventScreenNavigationProp>();

  useEffect(() => {
    connectWebSocket(); // Connect to the WebSocket when the component mounts
    loadEvents();
  }, []);

  const loadEvents = () => {
    fetchEvents((fetchedEvents: Event[]) => {
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
