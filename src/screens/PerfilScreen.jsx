import { View, Text, Button, ScrollView, TextInput, StyleSheet, Pressable} from 'react-native'

export default function PerfilScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.headerContent}>
          <View style={{ alignItems: 'center' }}>

            <View style={styles.avatarCircle}>
              <Text style={{ color: "rgba(255, 255, 255, 0.77)", fontSize: 35, fontWeight: "700" }}>AN</Text>
            </View>

            <Text style={styles.headerTitle}>Ana Silva</Text>
            <Text style={styles.headerSubtitle}>Bem-vinda ao seu perfil</Text>
            
          </View>
        </View>
      </View>
      

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, paddingHorizontal: 20 }}>
        <View style={styles.topAval}>
          <Text style={{ color: '#1B6B4A', fontSize: 26, fontWeight: '600' }}>12</Text>
          <Text style={{ color: '#888888', fontSize: 16, fontWeight: '600' }}>Avaliaçoes</Text>
        </View>

        <View style={styles.topAval}>
          <Text style={{ color: '#1B6B4A', fontSize: 26, fontWeight: '600' }}>4.2</Text>
          <Text style={{ color: '#888888', fontSize: 16, fontWeight: '600' }}>Média</Text>
        </View>

        <View style={styles.topAval}>
          <Text style={{ color: '#1B6B4A', fontSize: 26, fontWeight: '600' }}>3</Text>
          <Text style={{ color: '#888888', fontSize: 16, fontWeight: '600' }}>Resolvidas</Text>
      </View>

      </View>

       <View style={styles.menuContainer}>
          
          <Pressable style={styles.menuItem}>
            <Text style={{ color: '#333333', fontSize: 16 }}>Notificações</Text>
            onPress={() => navigation.navigate('Notificacoes')}
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Text style={{ color: '#333333', fontSize: 16 }}>Sobre o app</Text>
            onPress={() => {}}
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Text style={{ color: '#333333', fontSize: 16 }}>Editar Perfil</Text>
            onPress={() => {}}
          </Pressable>

          <Pressable
        onPress={() => navigation.navigate('Inicio')}
        style={({ pressed }) => [styles.botaoSair, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.botaoSairTexto}>Sair da conta</Text>
      </Pressable>

       </View>

    </View> 
       
  )
}

const styles= StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor:"#FFFFFF"
  },
    head:{
      backgroundColor: "#1B6B4A",
      paddingHorizontal: 'auto',
      paddingTop: 56,
      paddingBottom: 50,
     alignItems: 'center',
      paddingRight: '0%',
      
    },
    headerContent: {
      //flexDirection: 'row',
      //justifyContent: 'space-between',
      alignItems: 'center',
      //margin: 'auto'
    },
    headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: "#FFFFFF",
     textAlign: 'center', 
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#A8E6C8",
    marginTop: 2,
     textAlign: 'center', 
  },
  avatarCircle: {
    width: 100,
    height: 100,
    
    borderColor: '#ffffffe3',
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#2A8A60",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  topAval: {
    backgroundColor: "#e0e0e0b9",
    height: 110,
    width: 110,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    
  },
   menuContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
    alignItems: 'center',
    
  },
   menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: '95%',
    height: 75,
    margin: 2,
  },
  botaoSair: {
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E53935',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    height: 60,
    width: '80%',
    justifyContent: 'center',
    
  },
  botaoSairTexto: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: '500',
  },

})