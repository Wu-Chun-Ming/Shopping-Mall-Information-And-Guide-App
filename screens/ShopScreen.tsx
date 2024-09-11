import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { fetchShops } from '../server/db';  // Import the fetchShops function from db.js

export default function ShopScreen() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    const shopList = await fetchShops();
    setShops(shopList);
  };

  return (
    <View>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Floor: {item.floor}</Text>
            <Text>Type: {item.type}</Text>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.picture}` }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        )}
      />
    </View>
  );
}