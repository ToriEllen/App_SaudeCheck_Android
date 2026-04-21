import { View, Text, Button, ScrollView, TextInput, StyleSheet, Pressable} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function HomeScreen({navigation}) {
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

          <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar unidade..."
          placeholderTextColor={"#888888"}
        />
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
                onPress={() => navigation.navigate("...")}
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
                  {/* Mini map dots */}
                 {/* <View style={styles.mapDots}>
                    <View style={[styles.mapDot, { backgroundColor: COLORS.red }]} />
                    <View style={[styles.mapDot, { backgroundColor: COLORS.green, marginTop: -6 }]} />
                    <View style={[styles.mapDot, { backgroundColor: COLORS.orange }]} />
                  </View>*/}

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
    width: '182',
    height: '25%',
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



})