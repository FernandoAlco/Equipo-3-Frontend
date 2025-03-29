import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { ArrowLeft, User, Plus, Send, MapPin } from 'lucide-react-native';
import { Image } from 'react-native';


export default function Chat() {
  const [messages, setMessages] = useState<{ id: number; text: string; isMe: boolean }[]>([]);
  const [inputText, setInputText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useState(new Animated.Value(0))[0];

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputText, isMe: true }]);
      setInputText('');
    }
  };

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View className="flex-1 bg-gray-190">
      
      {/* Encabezado */}
      <View className="p-4">
        <View className="flex-row items-center bg-green-800 p-4 rounded-3xl shadow-lg">
          <TouchableOpacity className="p-2">
          <TouchableOpacity className="p-2">
  <Image 
    source={require('../assets/back-icon.png')} 
    className="w-6 h-6" 
    resizeMode="contain"
  />
</TouchableOpacity>
          </TouchableOpacity>
          <View className="flex-row items-center ml-4 flex-1 rounded-xl p-2">
            <View className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
            <Image 
    source={require('../assets/user-icon.png')} 
    className="w-6 h-6" 
    resizeMode="contain"
  />
            </View>
            <Text className="ml-3 text-white font-bold text-lg" style={{ fontFamily: 'Poppins-Black' }}>Alejandro Lopez Nava</Text>
          </View>
        </View>
      </View>

      {/* Mensajes */}
      <ScrollView className="flex-1 p-4">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-2 p-3 max-w-[70%] rounded-xl ${message.isMe ? 'self-end bg-green-500 rounded-br-none' : 'self-start bg-gray-300 rounded-bl-none'}`}
          >
            <Text className="text-white">{message.text}</Text>
          </View>
        ))}
      </ScrollView>

    {/* Menú emergente */}
    {menuVisible && (
        <Animated.View style={{ transform: [{ translateY: menuTranslateY }] }} className="absolute p-6 bottom-20 w-58">
          <View className="bg-white rounded-full shadow-lg p-3 mb-2">
            <TouchableOpacity className="flex-row items-center p-2">
            <Image 
    source={require('../assets/maps-icon.png')} 
    className="w-6 h-6" 
    resizeMode="contain"
  />
              <Text className="ml-4 text-black font-extrabold text-lg" style={{ fontFamily: 'Poppins-Black' }}>Mapa</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-full shadow-lg p-3">
            <TouchableOpacity className="flex-row items-center p-2 ">
            <Image 
    source={require('../assets/form-icon.png')} 
    className="w-6 h-6" 
    resizeMode="contain"
  />
              <Text className="ml-4 text-black font-extrabold text-lg"  style={{ fontFamily: 'Poppins-Black' }}>Solicitar intercambio</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      {/* Caja de mensaje */}
      <View className="flex-row items-center p-5">
        <TouchableOpacity onPress={toggleMenu} className="p-5 bg-gray-300 rounded-2xl">

  <Image 
    source={require('../assets/plus-icon.png')} 
    className="w-6 h-6" 
    resizeMode="contain"
  />

        </TouchableOpacity>
        <TextInput
          className="flex-1 mx-2 p-6 bg-gray-200 rounded-2xl"
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity onPress={handleSend} className="p-5 bg-green-500 rounded-2xl">
        <Image 
    source={require('../assets/send-icon.png')} 
    className="w-6 h-6" 
    resizeMode="contain"
  />
        </TouchableOpacity>
      </View>
    </View>
  );
}
