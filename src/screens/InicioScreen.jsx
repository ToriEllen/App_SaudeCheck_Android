import { View, Button, StyleSheet } from 'react-native'

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Button title="Entrar" onPress={() => navigation.navigate("Login")} />

      <Button title="Criar Conta" onPress={() => navigation.navigate("Cadastro")}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})