import { View, Text, Button, ScrollView, TextInput, StyleSheet, Pressable,  FlatList, TouchableOpacity} from 'react-native';
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



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

export default function HomeScreen({navigation}) {
  const [busca, setBusca] = useState("");
  const unidadesFiltradas = unidades.filter((item) =>
  item.nome.toLowerCase().includes(busca.toLowerCase())
);

  return (
    
    <View style={styles.container}>
      <View style={styles.head}>
         <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Olá, Ana</Text>
            <Text style={styles.headerSubtitle}>Como podemos ajudar?</Text>
          </View>
          
          <Pressable 
          style={styles.avatarCircle}
          onPress={() => navigation.navigate("Perfil")}
          ><Feather name="user" size={35} color="rgba(255, 255, 255, 0.77)" /></Pressable>
        </View>
      </View>

        <View style={styles.main}>

        <View style={{ width: "100%" }}>
          <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar unidade..."
          placeholderTextColor={"#888888"}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

          {busca.length > 0 && (
  <FlatList
    data={unidadesFiltradas}
    keyExtractor={(item) => item.id}
    style={styles.lista}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.itemLista}
        onPress={() => {
          // Navega para a estrutura correta de abas (MainTabs -> Mapa)
          navigation.navigate('MainTabs', {
            screen: 'Mapa',
            params: { 
              unidade: {
                lon: item.coordenadas[0], // Mantém unidade.lon esperado pelo seu mapa
                lat: item.coordenadas[1], // Mantém unidade.lat esperado pelo seu mapa
                nome: item.nome,
                endereco: item.endereco,
              }
            }
          });
          setBusca(""); // Limpa o campo de busca após clicar
        }}
      >
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.endereco}>{item.endereco}</Text>
      </TouchableOpacity>
    )}
  />
)}
            </View>
           {/* <Button title="Minhas Avaliacoes" onPress={() => navigation.navigate("MinhasAvaliacoesScreen")}/>   
            <Button title="Nova Avaliacao" onPress={() => navigation.navigate("NovaAvaliacaoScreen")}/> */}



               <Pressable
                onPress={() => navigation.navigate("NovaAvaliacao")}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed, { marginTop: 30 }]}
              >
                    <Text style={{ color: '#2A8A60', fontSize: 36, fontWeight: '800' }}>★</Text>
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Fazer</Text>
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Avaliação</Text>
              </Pressable>

               <Pressable
                onPress={() => navigation.navigate("Avaliações")}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed, { marginTop: 30 }]}
              >
                    <Text style={{ color: '#2A8A60', fontSize: 36, fontWeight: '800' }}>☰</Text>
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Minhas</Text>
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Avaliações</Text>
              </Pressable>

               <Pressable
                onPress={() => navigation.navigate("Notificacoes")}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              >
                    <Ionicons name="notifications" size={38} color="#E8A020" />
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Notificações</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Mapa")}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              >
                    <Feather name="map" size={35} color="#2A8A60" />
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Mapa de</Text>
                    <Text style={{ color: '#2A8A60', fontSize: 16, fontWeight: '700' }}>Unidades</Text>
              </Pressable>

              <Pressable
                onPress={() =>navigation.navigate("Unidades")}
                style={({ pressed }) => [styles.mapBanner, pressed && { opacity: 0.85 }]}>
                <View style={styles.mapBannerText}>
                  <Text style={styles.mapBannerTitle}>Unidades de Saúde</Text>
                  <Text style={styles.mapBannerSub}>Encontre a mais próxima</Text>
                  

                  <View style={{ flexDirection: "row", marginTop: 10, gap: 10}}>
                    <View style={{ margin: 30 }}>
                      <FontAwesome5 name="map-pin" size={24} color="#E53935" />
                    </View>
                    
                    <View style={{ margin: 10 }}>
                      <FontAwesome5 name="map-pin" size={24} color="#1B6B4A" />
                    </View>
                    <View style={{ marginTop: 50 }}>
                      <FontAwesome5 name="map-pin" size={24} color="#E8A020" />
                    </View>
                  </View>
                     
                </View>
                <Text style={styles.mapArrow}>›</Text>
              </Pressable>

              

       </View>   
    </View>
  )
}

const styles= StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor:"#FFFFF"
  },
    head:{
      backgroundColor: "#1B6B4A",
      paddingHorizontal: 30,
      paddingTop: 56,
      paddingBottom: 50,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#A8E6C8",
    marginTop: 2,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    padding: 5,
    borderRadius: 26,
    backgroundColor: "#2A8A60",
  },
  main:{
    flexDirection:'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 4,  
  },

   searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    width: "100%",
  },
  searchInput: {
    backgroundColor: '#eeeeee',
    borderColor: '#c5c5c5',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    fontSize: 13,
    color: '#333',
  },

  card: {
    width: 182,
    height: "25%",
    backgroundColor: '#E8F5EE',
    borderColor: '#C8E6D4',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 14,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardIcon: {
    fontSize: 26,
    color: '#1B6B4A',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B6B4A',
    lineHeight: 16,
  },

  mapBanner: {
    width: "98%",
    marginHorizontal: 1,
    marginTop: 12,
    backgroundColor: '#E8F5EE',
    borderColor: '#C8E6D4',
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapBannerText: {
    flex: 1,
  },
  mapBannerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2A8A60',
  },
  mapBannerSub: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  lista: {
  backgroundColor: "#fff",
  borderRadius: 10,
  marginTop: 5,
  maxHeight: 250,
  width: "100%",
  zIndex: 999,
},

itemLista: {
  padding: 15,
  borderBottomWidth: 1,
  borderColor: "#ddd",
},

nome: {
  fontWeight: "bold",
},

endereco: {
  color: "#666",
  marginTop: 4,
},



})



