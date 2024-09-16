import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.paragraph}>
        Welcome to XYZ Mall, the largest shopping destination in the city. We house over 300 shops, a wide variety of restaurants, and exciting events year-round. Our mission is to provide a premium shopping experience for all visitors.
      </Text>
      <Text style={styles.paragraph}>
        At XYZ Mall, we pride ourselves on offering a mix of high-end fashion, everyday essentials, and entertainment options. Whether you're here to shop, dine, or enjoy a fun day out, we have something for everyone.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
  },
});

export default AboutUsScreen;