import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchShopById, getDBConnection } from '../database/db-service';
import { getShopImageSource } from './images';

const ShopDetailScreen = ({ route, navigation }: any) => {

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
  if (!shop) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={80} color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        {/* <Text style={{ fontWeight: 'bold' }}>Shop Name: </Text> */}
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
      <Text>
        <Text style={styles.label}>Rating: </Text>
        {shop.rating}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    // textAlign: 'center',
    // margin: 10,
  },
  // data: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 10,
  // },
});

export default ShopDetailScreen;