import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { getDBConnection, fetchShops, fetchEvents } from '../database/db-service';  // Fetch shops from SQLite database
import { getEventImageSource, getShopImageSource } from './images';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ route, navigation }: any) => {
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
    // else {
    //   setFilteredShops(shops);
    // }
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
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            backgroundColor: '#786e6d',
            color: 'white',
            padding: 10,
            borderRadius: 10,
          }}>Shops</Text>
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
                  <Image
                    source={getShopImageSource(item.type, item.name)}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 20,
                      margin: 10,
                    }}
                  />
                  <Text style={{
                    flexWrap: 'wrap',
                    width: 150,
                    height: 40,
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                  >{item.name.toUpperCase()}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          />

          {/* Events List */}
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            backgroundColor: '#786e6d',
            color: 'white',
            padding: 10,
            borderRadius: 10,
          }}>Events</Text>
          <FlatList
            data={events}
            horizontal={true}
            keyExtractor={(item: any) =>
              item.id.toString()
            }
            renderItem={({ item }: any) => (
              <TouchableNativeFeedback onPress={() =>
                navigation.navigate('Event Detail', { eventId: item.id })}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <View>
                  <Image
                    source={getEventImageSource(item.id)}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 20,
                      margin: 10,
                    }}
                  />
                  <Text style={{
                    flexWrap: 'wrap',
                    width: 150,
                    height: 40,
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                  >{item.name.toUpperCase()}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    justifyContent: 'flex-end',
    // borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    // paddingBottom: 10,
    height: 150,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    // color: '#fff',
    fontWeight: 'bold',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    // alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
    // margin: 20,
  },
});

export default HomeScreen;