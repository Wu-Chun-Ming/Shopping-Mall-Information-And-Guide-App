import React from 'react';
import { View, Text } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About Us</Text>
      <Text style={{ marginTop: 10 }}>
        Welcome to XYZ Mall, the largest shopping destination in the city. We house over 300 shops, a wide variety of restaurants, and exciting events year-round. Our mission is to provide a premium shopping experience for all visitors.
      </Text>
      <Text style={{ marginTop: 10 }}>
        At XYZ Mall, we pride ourselves on offering a mix of high-end fashion, everyday essentials, and entertainment options. Whether you're here to shop, dine, or enjoy a fun day out, we have something for everyone.
      </Text>
    </View>
  );
}

export default AboutUsScreen;