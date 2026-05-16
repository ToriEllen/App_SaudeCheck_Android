import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import InicioScreen from '../screens/InicioScreen'
import LoginScreen from '../screens/LoginScreen'
import CadastroScreen from '../screens/CadastroScreen'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import MinhasAvaliacoesScreen from '../screens/MinhasAvaliacoesScreen'
import NovaAvaliacaoScreen from '../screens/NovaAvaliacaoScreen'
import PerfilScreen from '../screens/PerfilScreen'
import UnidadesScreen from '../screens/UnidadesScreen';
import NotificacoesScreen from '../screens/NotificacoesScreen';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
    tabBarStyle: {
      backgroundColor: "#1B6B4A",
      height: 60,
      borderTopWidth: 0,
      elevation: 10,
    },
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: "#93d4b5",

    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = "home";
      } else if (route.name === "Mapa") {
        iconName = "map";
      } else if (route.name === "Avaliações") {
        iconName = "star";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
    >
      <Tab.Screen name="Home"  component={HomeScreen} options={{ headerShown: false }}  />
      <Tab.Screen name="Mapa" component={MapScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Avaliações" component={MinhasAvaliacoesScreen} />
    </Tab.Navigator>
  )
}
export default function AppNavigator() {
  return (
    <NavigationContainer>

<Stack.Navigator>
  <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
  <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
  <Stack.Screen name="NovaAvaliacao" component={NovaAvaliacaoScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Unidades" component={UnidadesScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Notificacoes" component={NotificacoesScreen} options={{ headerShown: false }} />
</Stack.Navigator>

    </NavigationContainer>
  )
}