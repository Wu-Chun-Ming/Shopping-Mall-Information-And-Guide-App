import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { WebSocket } from 'react-native-websocket'; // or use your websocket library of choice

export default function QnAScreen() {
  const [qnaData, setQnaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000'); // Connect to WebSocket server

    ws.onopen = () => {
      console.log('Connected to the Q&A WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setQnaData(data);
      setLoading(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from the Q&A WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={qnaData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.question}</Text>
            <Text>{item.answer}</Text>
          </View>
        )}
      />
    </View>
  );
}