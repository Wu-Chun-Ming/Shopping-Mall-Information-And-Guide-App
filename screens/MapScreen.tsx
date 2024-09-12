import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define the structure of the shop object
interface Shop {
  name: string;
  latitude: number;
  longitude: number;
}

// Define the route parameters for ShopMap
type RootStackParamList = {
  ShopMap: { shop: Shop };
};

type ShopMapScreenRouteProp = RouteProp<RootStackParamList, 'ShopMap'>;

// Define Props type for ShopMap component
interface Props {
  route: ShopMapScreenRouteProp;
}

const ShopMap: React.FC<Props> = ({ route }) => {
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
        <Marker
          coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
          title={shop.name}
        />
      </MapView>
    </View>
  );
};

export default ShopMap;
