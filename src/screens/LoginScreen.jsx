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
import Svg, { Path } from 'react-native-svg';

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
  YellowBox: '#E8A020',
  gray:'#A8E6C8',

};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

      React.useLayoutEffect(() => {
       navigation.setOptions({
       headerShown:true,        
       headerTitle:'Login',          
       headerStyle:{
       backgroundColor: COLORS.secondary,
       },
       headerTintColor:'#fff',
       });
       }, [navigation]);
            

const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro','Preencha todos os campos');
      return;
    }
 
    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('MainTabs');
    } catch (error) {
      setLoading(false);

      let errorMessage ='Erro ao fazer login. Tente novamente.';

      if (error.code ==='auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.code ==='auth/wrong-password') {
        errorMessage ='Senha incorreta.';
      } else if (error.code ==='auth/invalid-email') {
        errorMessage ='E-mail inválido.';
      } else if (error.code ==='auth/too-many-requests') {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
      } else if (error.code ==='auth/invalid-credential') {
        errorMessage ='E-mail ou senha incorretos.';
      }

      Alert.alert('Erro', errorMessage);
    }
  };

const handleForgotPassword = async () => {
      if (!email) {

      Alert.alert(
        'Recuperar Senha',
        'Digite seu e-mail no campo acima e tente novamente.'
      );
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);

      Alert.alert(
        'E-mail enviado! ✉️',
        `Enviamos um link de recuperação para ${email}. Verifique sua caixa de entrada.`
      );
    } catch (error) {

      Alert.alert('Erro', 'Não foi possível enviar o e-mail. Verifique o endereço digitado.');
    }
  };

  return (
  
  <SafeAreaView style={styles.safeArea}>

    <View style={styles.waveContainer}>
      <Svg height="220" width="400" viewBox="0 0 400 220" style={{ position:'absolute', top:0, right:12 }}>
     
      <Path
        d="M400 0 C300 0 280 80 200 80 C120 80 100 20 0 30 L0 0 Z"
        fill="#A8E6C8"
        opacity="0.9"
      />
      <Path
        d="M400 0 C320 0 300 60 220 60 C140 60 120 10 0 20 L0 0 Z"
        fill="#2A8A60"
        opacity="0.9"
      />
      </Svg>
    </View>


    <View style={styles.waveBottomContainer}>
      <Svg height="100" width="600" viewBox="0 0 400 50">
      
      <Path
      d="M0 60 L0 30 Q40 10 100 20 Q200 40 300 15 Q360 5 400 20 L400 60 Z"
      fill="#E8A020"
      opacity="0.9"
      />
      <Path
      d="M0 60 L0 40 Q30 20 70 30 Q130 45 190 30 Q250 15 300 28 Q360 40 400 30 L400 60 Z"
      fill="#2A8A60"
      opacity="0.9"
      />
      <Path
      d="M0 60 L0 50 Q60 30 110 42 Q170 54 230 40 Q290 26 340 38 Q375 46 400 40 L400 60 Z"
      fill="#1B6B4A"
      opacity="0.9"
      />
      </Svg>
    </View>

  <KeyboardAvoidingView

      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        >
      
    <View style={styles.header}>
           
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>
          Acesse sua conta 
        </Text>
    </View>

    <View style={styles.form}>
        
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor={COLORS.grayPlaceholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor={COLORS.grayPlaceholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity
           onPress={handleForgotPassword}
           style={styles.forgotContainer}
            >
        <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={[styles.button, loading && styles.buttonDisabled]}
           onPress={handleLogin}
           disabled={loading}
           activeOpacity={0.8}
            >
           {loading ? (
        <ActivityIndicator color={COLORS.white} size="small" />
             ) : (
        <Text style={styles.buttonText}>Entrar</Text>
              )}
        </TouchableOpacity>
    </View>

    <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>ou</Text>
    <View style={styles.dividerLine} />
    </View>

        <TouchableOpacity
           onPress={() => navigation.navigate('Cadastro')}
           style={styles.registerContainer}
           activeOpacity={0.8}
           >
        <Text style={styles.registerText}> Ainda Não tem conta? </Text>
        <Text style={styles.registerLink}>Criar conta</Text>
        </TouchableOpacity>

      </ScrollView>
  </KeyboardAvoidingView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  safeArea: {
    flex: 1,
    backgroundColor:COLORS.white,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent:'flex-start',
  },
  header: {
    alignItems:'center',
    marginBottom: 40,
    marginTop: 90,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.softGreen,
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 16,
    shadowColor:COLORS.primary,
    shadowOffset: {width: 0,height:4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 17,
    color: COLORS.grayPlaceholder,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.grayText,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.grayText,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  forgotContainer: {
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grayBorder,
  },
  dividerText: {
    marginHorizontal: 12,
    color: COLORS.grayPlaceholder,
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 12,
  },
  registerText: {
    color: COLORS.grayText,
    fontSize: 16,
  },
  registerLink: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  waveBottomContainer: {
  position: 'absolute',
  bottom: 0,
  left: -90,
  right: 0,
},
});
export default LoginScreen;