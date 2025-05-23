import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const sendMessage = async () => {
    setReply('Loading...');
    try {
      const response = await fetch('http://192.168.4.26:8888/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setReply(data.reply);
    } catch (err) {
      setReply('Failed to reach backend.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Ask your Companion..."
      />
      <Button title="Send" onPress={sendMessage} />
      <Text style={styles.reply}>{reply}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  reply: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});