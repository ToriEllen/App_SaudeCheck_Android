import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,

} from 'react-native';

import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Path, Circle } from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';


const COLORS = {
  primary:'#1B6B4A',       
  secondary:'#2A8A60',     
  softGreen:'#E8F5EE',     
  white:'#FFFFFF',         
  grayLight:'#F5F5F5',     
  grayBorder:'#E0E0E0',    
  grayText:'#333333',     
  grayPlaceholder:'#888888', 
  error:'#E53935',       
  success:'#A8E6C8',   
  YellowBox: '#E8A020',    
};

const BackLadoDireito = () => (
  <Svg
    style={{
      position:'absolute',
      top:-150,   
      right:-30, 
      zIndex:-1, 
    }}
    width="250"
    height="260"
    viewBox="0 0 400 400"
    >
    <Path
          d="M600 0 C200 10, 100 90, 370 400 C5000 300, 500 200, 600 100 L400 0Z"
          fill="#A8E6C8"
          opacity={0.6}
        />
    <Path
          d="M400 60 C350 80, 320 150, 360 230 C380 280, 400 260, 400 280 L400 0Z"
          fill="#0A3D28"
          opacity={0.6}
        />
    
  </Svg>
);
const BackLadoEsquerdo = () => (
  <Svg
    style={{
      position:'absolute',
      bottom:-600,
      left:-100,
      transform:[
        { rotate: '-55deg' }, 
        { scaleX: -1 } 
    ],
      zIndex: -1,
    }}
    width="350"
    height="300"
    viewBox="0 0 400 400"
  >
    <Path
       d="M600 0 C200 10, 100 90, 370 400 C5000 300, 500 200, 600 100 L400 0Z"
       fill="#A8E6C8"
       opacity={0.5}
    />

    <Path
      d="M400 60 C350 80, 320 150, 360 230 C380 280, 400 260, 400 280 L400 0Z"
      fill={COLORS.YellowBox}
      opacity={0.9}
    />
  </Svg>
);

const Pontos = () => (
  <Svg width={120} height={150} style={{ position: 'absolute', bottom: -600, right: -50, zIndex: 0,  }} 
>
  {Array.from({ length: 20 }).map((_, row) =>
    Array.from({ length: 20 }).map((_, col) => (
      <Circle
        key={`${row}-${col}`}
        cx={10  + col * 18}
        cy={ 10 + row * 20}
        r={2}
        fill={COLORS.YellowBox}
        opacity={0.9}
      />
    ))
  )}
  </Svg>
)

const CadastroScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [telefone, setTelefone] = useState('');

         React.useLayoutEffect(() => {
          navigation.setOptions({
          headerStyle: {
          backgroundColor: COLORS.primary,
          },
          headerTintColor: '#fff',
          headerTitle: 'Cadastro',
          });
          }, [navigation]);


const criarConta = async () => {
    if (!name || !email || !senha || !confirmSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
const userCredential = await auth().createUserWithEmailAndPassword(email, senha);
const user = userCredential.user;

      await user.updateProfile({ displayName: name });
      await firestore().collection('users').doc(user.uid).set({
        name,
        email,
        telefone,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert(
        'Sucesso!',
        'Conta criada com sucesso!',
        [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }]
      );




    } catch (error) {
      setLoading(false);
       
    
      let errorMessage = 'Erro ao criar conta. Tente novamente.';

  switch (error.code) {
    case 'auth/email-already-in-use':
      errorMessage = 'Este e-mail já está em uso. Tente outro.';
      break;
    case 'auth/invalid-email':
      errorMessage = 'E-mail inválido. Verifique e tente novamente.';
      break;
    case 'auth/weak-password':
      errorMessage = 'Senha fraca. Use pelo menos 6 caracteres.';
      break;
    case 'auth/network-request-failed':
      errorMessage = 'Sem conexão com a internet.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Muitas tentativas. Aguarde um momento.';
      break;


  default:
      errorMessage = error.code 
      ? `Código: ${error.code}` 
      : error.message 
      ? `Mensagem: ${error.message}`
      : 'Erro desconhecido sem código';
      break;
  }
      Alert.alert('Erro', errorMessage);
      }
  };




           return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >   
          <View style={styles.header}>

            <BackLadoDireito /> 
            <BackLadoEsquerdo />
            <Pontos />

          <View style={styles.iconHeader}>
            <Ionicons name="person-outline" size={48} color={COLORS.white}  />
          </View>

            <Text style={styles.titulo}>Criar Conta</Text>
            <Text style={styles.subtitulo}>
              Preencha os dados para se cadastrar no SaúdeCheck
            </Text>
          </View>

          <View style={styles.form}>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={COLORS.secondary} />
            <TextInput
              style={styles.inputComIcone}
              placeholder="Nome completo"
              placeholderTextColor={COLORS.grayPlaceholder}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
            <TextInput
              style={styles.inputComIcone}
              placeholder="E-mail"
              placeholderTextColor={COLORS.grayPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="phone-portrait-outline" size={20} color={COLORS.secondary} />
            <TextInput
              style={styles.inputComIcone}
              placeholder="telefone"
              placeholderTextColor={COLORS.grayPlaceholder}
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoComplete="tel"
            />
          </View>
      
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.secondary} />
            <TextInput
              style={styles.inputComIcone}
              placeholder="Senha"
              placeholderTextColor={COLORS.grayPlaceholder}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              autoComplete="password"
              />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.secondary} />
            <TextInput
              style={styles.inputComIcone}
              placeholder="Confirmar senha"
              placeholderTextColor={COLORS.grayPlaceholder}
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              secureTextEntry
              autoComplete="password"
            />
          </View>
          
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={criarConta}
              disabled={loading}
              activeOpacity={0.8}
            >
            {loading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.buttonText}>Criar Conta</Text>
              )}
            </TouchableOpacity>
          </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.linkContainer}
            >
              <Text style={styles.link}>
                   Já tem conta?{' '}
              <Text style={styles.linkBold}>Faça login</Text>
              </Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  titulo : {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: COLORS.grayPlaceholder,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 24,
  },
  
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.white,
  borderRadius: 12,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginBottom: 8,
  gap: 8,
  borderColor: COLORS.grayBorder,
  borderWidth: 1,
  },

  inputComIcone: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary,
  },

  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 45,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 12,
  },

  buttonDisabled: {
    backgroundColor: COLORS.grayPlaceholder,
    opacity: 0.7,
    elevation: 0,
    shadowOpacity: 0,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },

  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },

  link: {
    color: COLORS.grayText,
    fontSize: 16,
    textAlign: 'center',
  },

  linkBold: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  
  iconHeader: {
  width: 80,
  height: 80, 
  borderRadius: 90,
  backgroundColor:COLORS. secondary,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
  alignSelf: 'center',
},
});

export default CadastroScreen;