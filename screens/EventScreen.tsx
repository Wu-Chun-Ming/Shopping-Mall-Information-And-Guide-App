import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { fetchEvents, getDBConnection } from '../database/db-service';
import { getEventImageSource } from '../images';

const EventScreen = ({ route, navigation }: any) => {

  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const eventList = await fetchEvents(await getDBConnection());
    setEvents(eventList);
  };

  useEffect(() => {
    loadEvents();
  }, [])

  return (
    <View style={{
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      {/* Event List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', }}>{item.name}</Text>
            {/* Date */}
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Date: </Text>
              {item.date}
            </Text>
            {/* Time */}
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Time: </Text>
              {item.start_time} -
              {item.end_time}
            </Text>
            {/* Location */}
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Location: </Text>
              {item.location}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Event Detail', { eventId: item.id })
              }>
              <Image source={getEventImageSource(item.id)}
                style={{
                  width: Dimensions.get('window').width,
                  height: 300,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default EventScreen;