import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchShopById } from '../server/db';  // Import the fetchShopById function from db.js

// Define the Shop interface
interface Shop {
  id: string;
  name: string;
  floor: string;
  type: string;
  rating: number;
}

// Define the route prop type
interface RouteParams {
  route: {
    params: {
      shopId: string;  // Shop ID passed as a navigation parameter
    };
  };
}

export default function ShopDetails({ route }: RouteParams) {
  const { shopId } = route.params;  // Get the shop ID from navigation params
  const [shop, setShop] = useState<Shop | null>(null);  // Shop can be a Shop object or null

  useEffect(() => {
    const loadShopDetails = async () => {
      try {
        const shopDetails = await fetchShopById(shopId);
        setShop(shopDetails);
      } catch (error) {
        console.error('Failed to load shop details:', error);
      }
    };

    loadShopDetails();
  }, [shopId]);  // Re-fetch details if shopId changes

  if (!shop) {
    return <Text>Loading...</Text>;  // Show loading state
  }

  // Render shop details once loaded
  return (
    <View>
      <Text>{shop.name}</Text>
      <Text>Floor: {shop.floor}</Text>
      <Text>Type: {shop.type}</Text>
      <Text>Rating: {shop.rating}</Text>
    </View>
  );
}
