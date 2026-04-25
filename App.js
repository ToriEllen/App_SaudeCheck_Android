import { AvaliacoesProvider } from './src/services/AvaliacoesContext'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  return (
    <AvaliacoesProvider>
      <AppNavigator />
    </AvaliacoesProvider>
  );
}


/*
para ativar o kvm

sudo modprobe kvm_amd
  sudo chmod 666 /dev/kvm



/*~/Android/Sdk/emulator/emulator -avd NOME_DO_AVD -memory 1024 -no-snapshot &    para iniciar o emulador
/*npx expo run:android  rodar a aplicaçao
*/

