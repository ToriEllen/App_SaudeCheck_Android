import { View, Text, Button, ScrollView, TextInput} from 'react-native'

export default function CadastroScreen({navigation}) {
  return (
    <View>
      <Text>Tela de Cadastro</Text>

       <Button title="Ir para Home" onPress={() => navigation.navigate("MainTabs", {screen: "Home"})}/>   

    </View>
  )
}