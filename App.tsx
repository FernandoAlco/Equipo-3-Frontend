import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Button, SafeAreaView } from 'react-native';

import './global.css';
import Chat from './components/Chat';
import FormularioIntercambio from './components/FormularioIntercambio';

export default function App() {
  const [showChat, setShowChat] = useState(true); // Estado para controlar si se muestra el Chat o no
  const [showForm, setShowForm] = useState(false); // Estado para controlar si se muestra el Formulario o no

  const handleShowChat = () => {
    setShowChat(true);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowChat(false);
    setShowForm(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Botones en la parte superior */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
        <Button title="Ir a Chat" onPress={handleShowChat} />
        <Button title="Formulario" onPress={handleShowForm} />
      </View>

      {/* Mostrar Chat solo si el estado es true */}
      {showChat && <Chat />}
      {showForm && <FormularioIntercambio />}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
