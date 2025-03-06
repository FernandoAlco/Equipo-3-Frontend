import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type FormularioProps = {
  // Aquí puedes definir props si las necesitas, actualmente no es necesario.
};

const FormularioIntercambio: React.FC<FormularioProps> = () => {
  const [producto, setProducto] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [cambioPor, setCambioPor] = useState<string>('');
  const [ubicacion, setUbicacion] = useState<string>('');
  const [foto, setFoto] = useState<string | null>(null);
  const [region, setRegion] = useState({
    latitude: 25.8437966,
    longitude: -97.4555196,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const elegirFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const enviarFormulario = () => {
    Alert.alert('Formulario Enviado', 'Gracias por enviar el formulario.');
    // Aquí puedes manejar el envío de datos, por ejemplo, a un servidor.
  };

  return (
    <View className="flex-1 justify-center bg-white p-4">
      <Text className="mb-8 text-3xl font-bold">Formulario de intercambio</Text>
      <ScrollView>
        {/* Producto a Cambiar */}
        <Text className="mb-2 text-lg font-semibold">Producto a Cambiar</Text>
        <TextInput
          className="mb-4 rounded-md border border-gray-300 p-2 text-lg"
          placeholder="Nombre del producto"
          value={producto}
          onChangeText={setProducto}
        />

        {/* Descripción */}
        <Text className="mb-2 text-lg font-semibold">Descripción</Text>
        <TextInput
          className="mb-4 rounded-md border border-gray-300 p-2 text-lg"
          placeholder="Descripción del producto"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Cambio por */}
        <Text className="mb-2 text-lg font-semibold">Cambio por</Text>
        <TextInput
          className="mb-4 rounded-md border border-gray-300 p-2 text-lg"
          placeholder="Qué deseas cambiar por el producto"
          value={cambioPor}
          onChangeText={setCambioPor}
        />

        {/* Ubicación */}
        <Text className="mb-2 text-lg font-semibold">Ubicación</Text>
        <TextInput
          className="mb-4 rounded-md border border-gray-300 p-2 text-lg"
          placeholder="Ubicación"
          value={ubicacion}
          onChangeText={setUbicacion}
        />

        {/* Subir Foto */}
        <TouchableOpacity className="mb-4 rounded-md bg-green-500 py-2 px-4" onPress={elegirFoto}>
          <Text className="text-center text-white">Seleccionar Foto</Text>
        </TouchableOpacity>
        {foto && <Image source={{ uri: foto }} className="mt-4 h-48 w-48 rounded-md" />}

        {/* Mapa */}
        <Text className="mb-2 text-lg font-semibold">Mapa</Text>
        <MapView
          style={{ height: 200, width: '100%', borderRadius: 10 }}
          region={region}
          onRegionChangeComplete={setRegion}>
          <Marker coordinate={region} title="Ubicación Actual" />
        </MapView>

        {/* Botón Enviar */}
        <TouchableOpacity className="mt-4 rounded-md bg-green-500 py-2 px-4" onPress={enviarFormulario}>
          <Text className="text-center text-white">Enviar Formulario</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FormularioIntercambio;
