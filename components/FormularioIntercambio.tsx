import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Camera, ArrowLeft } from 'phosphor-react-native'; //npm install phosphor-react-native

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
    <View className="flex-1 bg-white p-4">
  <View className="flex-row items-center">
    <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-lime-400">
      <ArrowLeft size={28} color="black" />
    </TouchableOpacity>

    <Text className="ml-4 text-2xl font-bold">Formulario de intercambio</Text>
  </View>


  <ScrollView className="mt-9">
    {/* Producto a Cambiar */}
    <Text className="mb-1 text-lg font-semibold ">Producto a Cambiar</Text>
    <TextInput
      className="mb-4 rounded-full bg-gray-300 p-3 text-lg"
      placeholder="Nombre del producto"
      value={producto}
      onChangeText={setProducto}
    />
        {/* Descripción */}
        <Text className="mb-1 text-lg font-semibold">Descripción</Text>
        <TextInput
          className="mb-4 rounded-full bg-gray-300 p-3 text-lg"
          placeholder="Descripción del producto"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Cambio por */}
        <Text className="mb-1 text-lg font-semibold">Cambio por</Text>
        <TextInput
          className="mb-4 rounded-full bg-gray-300 p-3 text-lg"
          placeholder="Que deseas cambiar por el producto"
          value={cambioPor}
          onChangeText={setCambioPor}
        />

        {/* Ubicación */}
        <Text className="mb-1 text-lg font-semibold">Ubicación</Text>
        <TextInput
          className="mb-4 rounded-full bg-gray-300 p-3 text-lg"
          placeholder="Ubicación"
          value={ubicacion}
          onChangeText={setUbicacion}
        />

        {/* Botón para subir foto */}
        <TouchableOpacity
          className="mt-6 flex-row items-center justify-center"
          onPress={elegirFoto}>
          <View className="h-12 w-12 items-center justify-center rounded-full bg-lime-400">
            <Camera size={28} color="black" />
          </View>
          <Text className="ml-3 text-lg font-semibold">Seleccionar foto</Text>
        </TouchableOpacity>

        {/* Imagen seleccionada */}
        {foto && (
           <View className="mt-4 items-center">
          <Image source={{ uri: foto }} className="h-48 w-48 rounded-lg" />
         </View>
        )}

        {/* Mapa */}
        <Text className="mb-2 text-lg font-semibold">Mapa</Text>
        <MapView
          style={{ height: 200, width: '100%', borderRadius: 10 }}
          region={region}
          onRegionChangeComplete={setRegion}>
          <Marker coordinate={region} title="Ubicación Actual" />
        </MapView>

        {/* Botón Enviar */}
        <TouchableOpacity className="mt-4 rounded-full bg-lime-400 py-2 px-4" onPress={enviarFormulario}>
          <Text className="text-center text-black font-semibold">Enviar Formulario</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FormularioIntercambio;
