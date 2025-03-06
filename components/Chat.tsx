import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

// Definimos el tipo para los mensajes
type Message = {
  id: number;
  text: string;
  isMe: boolean;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]); // Aplicamos el tipo al estado
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      // Agregamos un nuevo mensaje al estado
      setMessages([...messages, { id: messages.length + 1, text: inputText, isMe: true }]);
      setInputText('');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/BackgroundTV.jpg')}
      className="flex-1"
      resizeMode="cover"
    >
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', padding: 16 }}>
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-2 rounded-lg p-3 ${message.isMe ? 'self-end bg-green-500' : 'self-start bg-gray-300'}`}>
            <Text className="text-white">{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row border-t border-gray-200 bg-white p-2">
        <TextInput
          className="mr-2 flex-1 rounded-3xl border border-gray-300 p-2"
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity className="rounded-lg bg-green-500 p-3" onPress={handleSend}>
          <Text className="text-white">Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}
