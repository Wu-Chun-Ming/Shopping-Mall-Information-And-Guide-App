import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { fetchFAQ, getDBConnection } from '../database/db-service';

const FAQScreen = () => {
  const [faqData, setFaqData] = useState([]);

  // Load frequently asked questions from database
  const loadFAQ = async () => {
    const faqData = await fetchFAQ(await getDBConnection());
    setFaqData(faqData);
  };

  useEffect(() => {
    loadFAQ();
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