import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { getDBConnection, fetchShops, fetchEvents } from '../database/db-service';  // Fetch shops from SQLite database
import { getEventImageSource, getShopImageSource } from '../images';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  const [shops, setShops] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);

  // Load shops
  const loadShops = async () => {
    const shopList = await fetchShops(await getDBConnection());
    setShops(shopList);
  };
  // Load events
  const loadEvents = async () => {
    const eventList = await fetchEvents(await getDBConnection());
    setEvents(eventList);
  };

  // Function to filter shops based on the search query
  const handleSearch = (query: any) => {
    setSearchQuery(query);
    if (query) {
      const filtered = shops.filter(shop =>
        shop.name.toLowerCase().includes(query.toLowerCase()) || shop.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredShops(filtered);
    }
  };

  useEffect(() => {
    loadShops();
    loadEvents();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');   // Clear the search query
    }, [navigation])
  )

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Search Bar */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10,
        }}
        placeholder="Search shops by name or type ..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Shop Suggestion */}
      {(searchQuery !== '') &&
        <FlatList
          data={filteredShops}
          renderItem={({ item }: any) => (
            <TouchableOpacity onPress={() =>
              navigation.navigate('Shop Detail', { shopId: item.id })}
            >
              <Text style={{ fontSize: 18 }}>{item.name.toUpperCase()}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Type: {item.type}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item: any) =>
            item.id.toString()
          }
        />}

      {/* Shops & Events */}
      {(searchQuery === '') &&
        <View>
          {/* Shops List */}
          <Text style={styles.sectionHeader}>Shops</Text>
          <FlatList
            data={shops}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: any) =>
              item.id.toString()
            }
            renderItem={({ item }: any) => (
              <TouchableNativeFeedback onPress={() => {
                navigation.navigate('Shop Detail', { shopId: item.id });
              }}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <View>
                  <Image source={getShopImageSource(item.type, item.name)} style={styles.image} />
                  <Text style={styles.label}>{item.name.toUpperCase()}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          />

          {/* Events List */}
          <Text style={styles.sectionHeader}>Events</Text>
          <FlatList
            data={events}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: any) =>
              item.id.toString()
            }
            renderItem={({ item }: any) => (
              <TouchableNativeFeedback onPress={() =>
                navigation.navigate('Event Detail', { eventId: item.id })}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <View>
                  <Image source={getEventImageSource(item.id)} style={styles.image} />
                  <Text style={styles.label}>{item.name.toUpperCase()}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    flexWrap: 'wrap',
    width: 150,
    height: 40,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: '#786e6d',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;