
import React from 'react';
import { 
  
  View, 
  Text,
  StyleSheet ,
  TouchableOpacity,

} from 'react-native';

import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold , Nunito_900Black } from '@expo-google-fonts/nunito'; 
import Svg, { Path, Circle } from 'react-native-svg';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#1B6B4A',
    
    
  },
  conteudo:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 30,

  },
  logoCirculo:{
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tituloContainer:{
    alignSelf: 'stretch', 
    paddingHorizontal: 50,
    fontFamily: 'Nunito_900Black',

  },
  titulo1:{
    color: '#FFFFFF',
    fontSize: 75,
    fontWeight: 'bold',
    marginBottom: -18,
    alignSelf: 'flex-start',

    
  }, 
  titulo2: {
    color: '#E8A020',
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'flex-end',
  
  },
  subtitulo:{
    color: '#FFFFFF',
    fontSize: 22,
    marginBottom: 3,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
    
  },
  subtitulo2:{
    color: '#FFFFFF',
    fontSize: 18, 
    marginBottom: 24,
    fontFamily: 'Nunito_600SemiBold',
    
    
  },
  botaoPrincipal:{
    backgroundColor: '#E8F5EE',
    paddingVertical: 16,
    paddingHorizontal: 55,
    borderRadius: 40,
    marginTop: 40,
    marginBottom: 16,
  },
  botaoPrincipalTexto:{
    color: '#2A8A60',
    fontSize: 18,
    fontWeight: 'bold',

  },
  linkTexto:{
    color: '#E8F5EE', 
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Nunito_700Bold',
    
  },
})

const BackgroundTopDireito = () => (
  <Svg
    style={{
      position:'absolute',
      top:0,
      right:0,
      zIndex:0,
    }}
    width="150"
    height="250"
    viewBox="0 0 400 400"
  >
    <Path
      d="M600 0 C200 10, 100 90, 370 400 C5000 300, 500 200, 600 100 L400 0Z"
      fill="#A8E6C8"
      opacity={0.6}
    />

    <Path
      d="M400 50 C350 80, 320 150, 360 230 C380 280, 400 260, 400 280 L400 0Z"
      fill="#0A3D28"
      opacity={0.6}
    />
  </Svg>
)
const PontosTop = () => (
  <Svg width={100} height={150} style={{ position: 'absolute', top: 70, left: 300, zIndex: 0, }}>
    {Array.from({ length: 50 }).map((_, row) =>
      Array.from({ length: 50}).map((_, col) => (
        <Circle
          key={`${row}-${col}`}
          cx={10 + col * 18}
          cy={10 + row * 20}
          r={2}
          fill="#ffffff"
          opacity={0.2}
        />
      ))
    )}
  </Svg>
)
const Pontos = () => (
  <Svg width={100} height={150} style={{position:'absolute',bottom:80,right:0, zIndex:0,}} 
>
  {Array.from({length:20}).map((_,row) =>
    Array.from({length:20}).map((_,col) => (
      <Circle
        key={`${row}-${col}`}
        cx={10+ col *18}
        cy={ 10+ row *20}
        r={2}
        fill="#ffffff"
        opacity={0.2}
      />
    ))
  )}
  </Svg>
)
const LinhasDecoradas = () => (
  <Svg
    style={{position:'absolute',top:0,left:0,zIndex:0}}
    width="100%"
    height="100%"
    viewBox="20 0 400 800"

  >
    <Path d="M20 40 C60 50, 100 25, 200 90"
     fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.1}/>

    <Path d="M20 55 C60 65, 100 35, 200 105"
     fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.1}/>

    <Path d="M20 70 C60 82, 100 45, 200 120"
     fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.1}/>

    <Path d="M20 85 C60 95, 100 55, 200 135"
     fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.1}/>

    <Path d="M20 100 C60 110, 100 65, 200 150" 
    fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.1}/>

    <Path d="M20 115 C60 125, 100 75, 200 165" 
    fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.1}/>
  </Svg>
)

const LogoIcon = ({size = 100}) => (
 <Svg width={size} height={size} viewBox="0 0 200 200" style={{left:98,top:75}}>

      <Path
        d="M100 170 
           C60 140, 20 110, 40 70 
           C55 40, 85 50, 100 70 
           C115 50, 145 40, 160 70 
           C180 110, 140 140, 100 170 Z"
        fill="#A8E6C8"
      />
      <Path
        d="M100 155 
           C70 130, 45 105, 55 80 
           C65 60, 85 65, 100 85 
           C115 65, 135 60, 145 80 
           C155 105, 130 130, 100 155 Z"
        fill="#1B6B4A"
      />

      <Circle cx="120" cy="95" r="10" fill="#FFFFFF" />
      <Path
        d="M105 130 
           Q120 110 135 130 
           L135 145 
           Q120 155 105 145 Z"
        fill="#FFFFFF"
      />

      <Circle cx="90" cy="105" r="7" fill="#FFFFFF" />
      <Path
        d="M80 120
           Q90 115 100 130 
           L100 140 
           Q90 150 80 140 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M135 20 
           H155 
           V40 
           H175 
           V60 
           H155 
           V80 
           H135 
           V60 
           H115 
           V40 
           H135 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M45 140 L90 180"
        stroke="#A8E6C8"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </Svg>
)
const Background = () => (
  <Svg

    style={{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,        
      zIndex:0,    
    }}
    width="100%"
    height="300"
    viewBox="0 0 400 300"
  >
    <Path
      d="M0 0 C50 20, 80 80, 40 150 C20 200, 0 180, 0 200 L0 0Z"
      fill="#0A3D28"
      opacity={0.4}
    />
    <Path
      d="M50 300 C100 250, 200 270, 280 230 C340 200, 370 240, 400 220 L400 420 C350 450, 200 430, 100 460 C50 470, 20 440, 0 420Z"
      fill="#0A3D28"
      opacity={0.6}
    />
    <Path
      d="M0 60 C100 100, 280 380, 280  225 C20 350, 0 330, 0 350 L0 150Z"
      fill="#77f1be"
      opacity={0.7}
      />
    </Svg>
)
export default function InicioScreen({navigation}) {
  
       const [fontsLoaded] = useFonts({
       Nunito_400Regular,
       Nunito_700Bold,
       Nunito_900Black,
       Nunito_600SemiBold
      });  

     if (!fontsLoaded) return null;

    return(


    <View style={styles.container}>

       <LinhasDecoradas/>
       <Background/>
       <Pontos/>
       <BackgroundTopDireito/>
       <PontosTop/>

    <View style={styles.conteudo}>
    <View style={styles.logoCirculo}>

               <LogoIcon/>

    </View>

    <View style={styles.tituloContainer} >

      <Text style={styles.titulo1}>Saúde</Text>
      <Text style={styles.titulo2}>Check</Text>

    </View>

      <Text style={styles.subtitulo}>Tecnologia que escuta você</Text>  
      <Text style={styles.subtitulo2}>Sua voz transforma a saúde pública</Text>

      <TouchableOpacity
         style={styles.botaoPrincipal}
         onPress={() => navigation.navigate('Cadastro')}
      >
      <Text style={styles.botaoPrincipalTexto}>Começar agora</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.linkTexto}>Já tenho conta →</Text>
      </TouchableOpacity>

    </View>
    </View>
  )
}
