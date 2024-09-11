import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchShopById } from '../server/db';  // Import the fetchShopById function from db.js

export default function ShopDetails({ route }) {
  const { shopId } = route.params;  // Get the shop ID from navigation params
  const [shop, setShop] = useState(null);

  useEffect(() => {
    loadShopDetails();
  }, []);

  const loadShopDetails = async () => {
    const shopDetails = await fetchShopById(shopId);
    setShop(shopDetails);
  };

  if (!shop) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{shop.name}</Text>
      <Text>Floor: {shop.floor}</Text>
      <Text>Type: {shop.type}</Text>
      <Text>Rating: {shop.rating}</Text>
    </View>
  );
}