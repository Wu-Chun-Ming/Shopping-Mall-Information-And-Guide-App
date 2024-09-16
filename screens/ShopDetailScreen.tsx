import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchShopById, getDBConnection } from '../database/db-service';
import { getShopImageSource } from '../images';

const ShopDetailScreen = ({ route }: any) => {

  const { width, height } = Dimensions.get('window');
  const { shopId } = route.params;  // Get the shop ID from route params
  const [shop, setShop] = useState(null);

  // Load shop detail from databased by shop id
  const loadShopDetail = async () => {
    const shopDetail = await fetchShopById(await getDBConnection(), shopId);
    setShop(shopDetail);
  };

  useEffect(() => {
    loadShopDetail();
  }, []);
  
  // If shop detail is not loaded
  (!shop) 
  ? (<View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={80} color="#0000ff" />
      </View>)
  : (<ScrollView style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        <Text>{shop.name.toUpperCase()}</Text>
      </Text>
      <Text>
        <Text style={styles.label}>Location: </Text>
        {shop.location}
      </Text>
      <Text>
        <Text style={styles.label}>Type: </Text>
        {shop.type}
      </Text>
      <Text>
        <Text style={styles.label}>Contact Number: </Text>
        {shop.contact}
      </Text>
      <Text style={{ textAlign: 'justify' }}>
        <Text style={styles.label}>Description: </Text>
        {shop.description}
      </Text>
      <View>
        <Image
          source={getShopImageSource(shop.type, shop.name)}
          style={{
            width: width,
            height: height * 0.4,
            resizeMode: 'contain',
          }}
        />
      </View>
    </ScrollView>)
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShopDetailScreen;