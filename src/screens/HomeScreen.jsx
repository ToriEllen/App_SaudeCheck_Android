import { View, Text, Button, ScrollView, TextInput, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

       <Button title="Ver Mapa" onPress={() => navigation.navigate("Mapa")}/>   

    </View>
  )
}