import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { View, Text } from 'react-native';

export default function ShopMap({ route }) {
  const { shop } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: shop.latitude,
          longitude: shop.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: shop.latitude, longitude: shop.longitude }} title={shop.name} />
      </MapView>
    </View>
  );
}