import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
// import io from 'socket.io-client';
// import { fetchEvents, fetchEventById, serverPath } from '../server/event-service';
import { fetchEvents, fetchEventById, getDBConnection } from '../database/db-service';
import { getEventImageSource } from './images';

// import { connectWebSocket, fetchEvents } from '../server/eventService';

// export default function EventScreen() {
//   const [events, setEvents] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     connectWebSocket(); // Connect to the WebSocket when the component mounts
//     loadEvents();
//   }, []);

//   const loadEvents = () => {
//     fetchEvents((fetchedEvents) => {
//       setEvents(fetchedEvents);
//     });
//   };

//   return (
//     <View>
//       <FlatList
//         data={events}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
//             <Text>{item.name}</Text>
//             <Text>{item.date}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// var socketLab = io('http://10.0.2.2:5000/event', {
//   transports: ['websocket']
// })

const EventScreen = ({ route, navigation }: any) => {

  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const eventList = await fetchEvents(await getDBConnection());
    setEvents(eventList);
  };

  useEffect(() => {
    loadEvents();
    // console.log(events);
    // socketLab.on('connect', () => {
    //   console.log(socketLab.id);
    // })
    // socketLab.on('error', (error) => {
    //   console.log(error);
    // })
    // socketLab.on('server_send', (data) => {
    //   let events = JSON.parse(data)      
    //   setEvents(events);
    // })
  }, [])

  return (
    <View style={{
      flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center'
    }}>
      {
        // !events ? (
        //   <View>
        //     <Text style={{ fontSize: 25, color: 'red' }}>Couldn't connect to the server.</Text>
        //     <View>
        //       <Button title='reload' onPress={() => {
        //         //   socketLab.emit('client_send');
        //         loadEvents();
        //         // if (events.length === 0) {
        //         if (!events) {
        //           Alert.alert('Please try again later.')
        //         }
        //       }}
        //       />
        //       {/* socketLab.emit('client_send', {
        //       radius: parseFloat(radius)
        //     }) */}
        //     </View>
        //   </View>
        // ) :
        // Event List
        // (events.length !== 0 && )
      }

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
              <Image source={getEventImageSource(item.id)
                // {
                // uri: serverPath + '/api/event/image/' + item.id
                // }
              }
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

// const styles = 

export default EventScreen;