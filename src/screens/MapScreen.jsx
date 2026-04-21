import { View, StyleSheet, Text, Modal, Animated, BackHandler, Dimensions, FlatList, Image, Alert } from "react-native"
import Mapbox, { MapView, Camera,  PointAnnotation} from "@rnmapbox/maps"
import { useState, useEffect, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import AppButton from "../components/AppButton";
import * as Clipboard from 'expo-clipboard';



const Screenheight = Dimensions.get("window").height;
const unidades = [
  {
    id: "1",
    nome: "UPA 24h - Conjunto Ceará",
    coordenadas: [-38.59987381990274,-3.7686414912723976],
    endereco : "R. 856, s/n - 3ª etapa - Conjunto Ceará I, Fortaleza - CE, 60532-380"
  },
  {
    id: "2",
    nome: "UPA 24h - Autran Nunes",
    coordenadas: [-38.59422797478764,-3.756004803567569],
    endereco : "Av. Senador Fernandes Távora, sn - Autran Nunes, Fortaleza - CE, 60526-642"
  }, 
  {
    id: "3",
    nome: "UPA 24h - Granja Lisboa",
    coordenadas: [ -38.62461991711671,-3.7907838782310157],
    endereco : "Rua Sargento João Pinheiro, sn - Granja Lisboa, Fortaleza - CE, 61661-115"
  }, 
  {
    id: "4",
    nome: "UPA 24h - Canindezinho",
    coordenadas: [ -38.6090231477984 ,-3.821451191565181],
    endereco : "R. José Dantas Pereira, 447 - Canindezinho, Fortaleza - CE, 60734-842"
  },
  {
    id: "5",
    nome: "UPA 24h - Itaperi",
    coordenadas: [ -38.554435878480895,-3.795423079490712],
    endereco : "R. Betel, sn - Rachel de Queiroz, Fortaleza - CE, 60714-315"
  }, 
  {
    id: "6",
    nome: "UPA 24h - Edson Queiroz",
    coordenadas: [-38.474263791975325,-3.7703430109762746 ],
    endereco : "UPA - Yolanda Queiroz - Av. Contôrno - Edson Queiroz, Fortaleza - CE, 60812-035"
  },
  {
    id: "7",
    nome: "UPA 24h - José Walter",
    coordenadas: [-38.54129011896326,-3.8255693926409786],
    endereco : "Av. Presidente Costa e Silva, s/n - Prefeito José Walter, Fortaleza - CE, 60761-190"
  },
  {
    id: "8",
    nome: "UPA 24h - Vila Velha",
    coordenadas: [-38.60175707663492,-3.716802921022975],
    endereco : "Av. L - Vila Velha, Fortaleza - CE, 60810-670"
  }, 
  {
    id: "9",
    nome: "UPA 24h - Jangurussu",
    coordenadas: [ -38.52266641062449,-3.8385883890676156],
    endereco : "Av. Contôrno Sul, S/N - Jangurussu, Fortaleza - CE, 60875-205"
  },
  {
    id: "10",
    nome: "UPA 24h - Cristo Redentor",
    coordenadas: [ -38.568381776634965,-3.708577662531748],
    endereco : "Av. Pres. Castelo Branco, s/n - Cristo Redentor, Fortaleza - CE, 60010-450"
  },
  {
    id: "11",
    nome: "UPA 24h - Praia do Futuro",
    coordenadas: [-38.454309632458155,-3.744559859835779],
    endereco : "R. Júlio Silva, 440 - Praia do Futuro, Fortaleza - CE, 60182-435"
  },
  {
    id: "12",
    nome: "UPA 24h - Messejana",
    coordenadas: [-38.48236563430406,-3.83942021528326],
    endereco : "R. Miguel Gurgel, s/n - Messejana, Fortaleza - CE, 60871-790"
  }
]

const pontosGeoJSON ={
  type: 'FeatureCollection',
  features: unidades.map((item) => ({
    type: 'Feature',
    id: item.id,
    properties: {
      nome: item.nome,
      endereco: item.endereco
    },
    geometry: {
      type: 'Point',
      coordinates: item.coordenadas,
    },
  }))

}

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN);

export default function MapScreen({route}) {
 const [visible, setVisible] = useState(false);
 const transformY = useRef(new Animated.Value(Screenheight)).current;
 const cameraRef = useRef(null);

  useEffect(() => {
    if (route?.params?.unidade) {
      const { unidade } = route.params
      setTimeout(() => {
        cameraRef.current?.setCamera({
          centerCoordinate: [unidade.lon, unidade.lat],
          zoomLevel: 15,
          pitch: 45,
          animationDuration: 1000,
        })
      }, 500)
    }
  }, [route?.params])
  
 const copiarEndereço = async (endereco) => {
  await Clipboard.setStringAsync(endereco);
  Alert.alert("Endereço copiado para a área de transferência!");
 }

 const irParaLocal = (item) => {
  cameraRef.current?.setCamera({
    centerCoordinate: item.coordenadas,
    zoomLevel: 15,
    pitch: 45,
    animationDuration: 1000,
  })
}; 

    const openModal = () => {

    setVisible(true);

    Animated.timing(transformY, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(transformY, {
      toValue: Screenheight,
      duration: 900,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  

  return (
    <View style={{ flex: 1 }}>

      <MapView style={styles.map}>
        <Camera
          ref={cameraRef}
          zoomLevel={12}
          centerCoordinate={[-38.5997, -3.7687]}
        />
        {unidades.map((item) => (
          <Mapbox.PointAnnotation
            key={item.id}
            id={item.id}
            coordinate={item.coordenadas}
          >
            <View collapsable={false} style={{ alignItems: "center" }}>
              <Ionicons name="location" size={30} color="red" />
              
                  <Text style={{ fontSize: 10 }}>{item.nome}</Text>
              
              
            </View>
          </Mapbox.PointAnnotation>
        ))}
         

      </MapView>

    <View style={{ position: "absolute", top: 50, alignSelf: "center", zIndex: 10}}>
        <AppButton title="Ver unidades" onPress={openModal} />
    </View>
        

      <Modal visible={visible} animationType="none" transparent onRequestClose={closeModal}>
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)"
        }}>
          
          <Animated.View style={{
            height: "80%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            transform: [{ translateY: transformY }]
          }}>
              <FlatList
                data={unidades}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{
                    padding: 15,
                    borderBottomWidth: 1,
                    borderColor: "#ddd"
                  }}>
                    <Text>{item.nome}</Text>
                    <Text>{item.endereco}</Text>
                     <View style={{ flexDirection: "row", marginTop: 10, gap: 10}}>
                      <Ionicons name="copy" size={15} color="#1B6B4A" onPress={() => {copiarEndereço(item.endereco)} }/>
                      <Ionicons name="navigate" size={16} color="#1B6B4A" onPress={() => { irParaLocal(item); closeModal()}}/>  

                     </View>
                  </View>
                )}
              />

            <AppButton title="Fechar" onPress={closeModal} />
          </Animated.View>

          

        </View>
            
        
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    width: "100%",
    
  },
  bottomSheet: {
    position: "absolute", 
  },

  buttons: {
     backgroundColor: "#1B6B4A"
  }
  
})