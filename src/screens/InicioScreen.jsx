import { View, Button, StyleSheet } from 'react-native'

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Button title="Entrar" onPress={() => navigation.navigate("Login")} />

      <Button title="Criar Conta" onPress={() => navigation.navigate("Cadastro")}/>

         <Button title="Ir para Tela Principal" onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}/>

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