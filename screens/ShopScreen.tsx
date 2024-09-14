import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchShops, getDBConnection } from '../database/db-service';
import { getShopImageSource } from './images';
import { FlatGrid } from 'react-native-super-grid';

const ShopScreen = ({ route, navigation }: any) => {
  const [shops, setShops] = useState([]);

  // Load the shops from database
  const loadShops = async () => {
    const shopList = await fetchShops(await getDBConnection());
    setShops(shopList);
  };

  useEffect(() => {
    loadShops();
  }, []);

  return (
    <View>
      {/* Shop List */}
      <FlatGrid
        data={shops}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer]}>
            <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Shop Detail', { shopId: item.id });
              }}
              style={{ width: '100%', }}
            >
              <Image
                source={getShopImageSource(item.type, item.name)}
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: '100%',
                }} />
            </TouchableOpacity>
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    justifyContent: 'flex-end',
    padding: 10,
    height: 150,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopScreen;