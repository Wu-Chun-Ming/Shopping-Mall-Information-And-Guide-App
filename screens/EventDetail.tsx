import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { fetchEventById } from '../server/eventService';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

// Define the navigation and route types for React Navigation
type RootStackParamList = {
  EventDetail: { eventId: string };
  Map: { location: string };
};

type EventDetailScreenNavigationProp = StackNavigationProp<
RootStackParamList,
  'EventDetail'
>;

type EventDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetail'
>;

interface Props {
  route: EventDetailScreenRouteProp;
  navigation: EventDetailScreenNavigationProp;
}

const EventDetail: React.FC<Props> = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEventDetail();
  }, [eventId]);

  const loadEventDetail = async () => {
    try {
      const eventDetail = await fetchEventById(eventId); // assuming fetchEventById returns a promise
      setEvent(eventDetail); // Ensure fetchEventById returns Event
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000fff" style={styles.loader} />
  }

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Event Name: {event.name}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Description: {event.description}</Text>

      <Button
        title="View Map"
        onPress={() => navigation.navigate('Map', { location: event.location })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EventDetail;
