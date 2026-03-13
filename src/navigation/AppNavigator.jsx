import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import InicioScreen from '../screens/InicioScreen'
import LoginScreen from '../screens/LoginScreen'
import CadastroScreen from '../screens/CadastroScreen'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import MinhasAvaliacoesScreen from '../screens/MinhasAvaliacoesScreen'
import NovaAvaliacaoScreen from '../screens/NovaAvaliacaoScreen'
import PerfilScreen from '../screens/PerfilScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"  component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Avaliações" component={MinhasAvaliacoesScreen} />
    </Tab.Navigator>
  )
}
export default function AppNavigator() {
  return (
    <NavigationContainer>

<Stack.Navigator>
  <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Cadastro" component={CadastroScreen} />
  <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
  <Stack.Screen name="NovaAvaliacao" component={NovaAvaliacaoScreen} />
  <Stack.Screen name="Perfil" component={PerfilScreen} />
</Stack.Navigator>

    </NavigationContainer>
  )
}