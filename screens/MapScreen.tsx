import React from 'react';
import { View } from 'react-native';
import { createMapLink } from 'react-native-open-maps';
import { WebView } from 'react-native-webview';

const MapScreen = () => {

  // Get the map link from google
  const getMapLink = () => {
    return createMapLink({
      provider: 'google',
      query: 'Avenue K Shopping Mall',
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: getMapLink() }} />
    </View>
  );
}

export default MapScreen;