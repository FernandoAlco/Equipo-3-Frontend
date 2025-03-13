import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { ArrowLeft, User } from 'lucide-react-native'; //npm install lucide-react-native

type Message = {
  id: number;
  text: string;
  isMe: boolean;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
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
    <View className="flex-1 border border-black">
      {/* Encabezado */}
      <View className="flex-row items-center p-6 ">
        <TouchableOpacity className="p-2 rounded-full bg-lime-300 ">
          <ArrowLeft size={44} color="green" />
        </TouchableOpacity>
        <View className="flex-row items-center ml-4 p-2 rounded-full bg-orange-300 flex-1">
        <View className="ml-1 w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <User size={34} color="black" />
          </View>
          <Text className="ml-5 font-bold text-black">Usuario</Text>
        </View>
      </View>

      {/* Mensajes */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', padding: 16 }}>
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-2 p-4 max-w-[80%] ${
              message.isMe
                ? 'self-end bg-green-500 rounded-3xl rounded-br-none' 
                : 'self-start bg-gray-300 rounded-3xl rounded-bl-none'
            }`}
          >
            <Text className="text-white">{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Caja de mensaje */}
      <View className="flex-row items-center p-2">
        <TextInput
          className="flex-1 rounded-3xl border border-gray-300 p-6 bg-gray-200 text-gray-600"
          value={inputText}
          onChangeText={setInputText}
          placeholder="escribe un mensaje..."
        />
        <TouchableOpacity className="ml-2 p-6 rounded-3xl bg-lime-400" onPress={handleSend}>
          <Text className="font-bold text-black">enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}
