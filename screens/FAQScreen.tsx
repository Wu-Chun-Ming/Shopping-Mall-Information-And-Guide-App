import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { fetchFAQ, getDBConnection } from '../database/db-service';
// import { WebSocket } from 'react-native-websocket'; // or use your websocket library of choice

const FAQScreen = () => {
  const [faqData, setFaqData] = useState([]);

  // Load frequently asked questions from database
  const loadFAQ = async () => {
    const faqData = await fetchFAQ(await getDBConnection());
    setFaqData(faqData);
  };

  useEffect(() => {
    loadFAQ();
    // const ws = new WebSocket('ws://localhost:8000'); // Connect to WebSocket server

    // ws.onopen = () => {
    //   console.log('Connected to the Q&A WebSocket server');
    // };

    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setQnaData(data);
    //   setLoading(false);
    // };

    // ws.onerror = (error) => {
    //   console.error('WebSocket error: ', error);
    // };

    // ws.onclose = () => {
    //   console.log('Disconnected from the Q&A WebSocket server');
    // };

    // return () => {
    //   ws.close();
    // };
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {(faqData.length === 0)
        ? <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size={80} color="#0000ff" />
        </View>
        : <FlatList
          data={faqData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.question}</Text>
              <Text>{item.answer}</Text>
            </View>
          )}
        />}
    </View>
  );
}

export default FAQScreen;