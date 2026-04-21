import { View, Text, Button, ScrollView, TextInput, StyleSheet} from 'react-native'

export default function PerfilScreen({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.head}>
         <View style={styles.headerContent}>
          <View style={{ alignItems: 'center' }}>

            <View style={styles.avatarCircle}>
               <Text style={{color: "rgba(255, 255, 255, 0.77)", fontSize: 35, fontWeight: "700"}}>AN</Text>
            </View>
            
            <Text style={styles.headerTitle}>Ana Silva</Text>
            <Text style={styles.headerSubtitle}>Bem-vinda ao seu perfil</Text>
          </View>
        </View>
      </View>
      <Text>Perfil</Text>
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
  }
})