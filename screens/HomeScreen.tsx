import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchShops } from '../server/db';  // Fetch shops from SQLite database

export default function HomeScreen() {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    const shopList = await fetchShops();
    setShops(shopList);
    setFilteredShops(shopList);
  };

  // Function to filter shops based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = shops.filter(shop =>
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredShops(filtered);
    } else {
      setFilteredShops(shops);
    }
  };

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
        placeholder="Search shops by name or type..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Shop List */}
      <FlatList
        data={filteredShops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ShopDetail', { shopId: item.id })}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Floor: {item.floor}</Text>
            <Text>Type: {item.type}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}