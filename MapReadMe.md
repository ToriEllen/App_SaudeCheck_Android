# SaudeCheck 🏥

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS)
- [Android Studio](https://developer.android.com/studio) com Android SDK
- [Java JDK 17](https://adoptium.net/) (Temurin 17) — **não use Java 21, é incompatível com o Gradle**
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

---

## Tokens necessários

O projeto usa dois tokens do Mapbox com funções diferentes:

| Token | Onde usar | Função |
|-------|-----------|--------|
| `pk.xxx` | `MapScreen.jsx` → `Mapbox.setAccessToken()` | Exibir o mapa no app |
| `sk.xxx` | `MAPBOX_DOWNLOADS_TOKEN` no `gradle.properties` e variável de ambiente | Baixar o SDK nativo durante o build |

> Solicite os tokens ao responsável pelo mapa.

# 🔐 Configuração de Chaves Secretas

## Arquivos necessários (NÃO estão no repositório)

### 1. `.env` (na raiz do projeto)
Crie o arquivo `.env` com base no `.env_Example`:

### 2. `google-services.json` (na raiz do projeto)
Baixe do Firebase Console:
- Acesse https://console.firebase.google.com
- Projeto SaudeCheck → Configurações → Google Services
- Baixe o `google-services.json` e coloque na raiz do projeto



---

## Configuração inicial

### 1. Clone o repositório e instale as dependências

```bash
git clone <url-do-repositorio>
cd SaudeCheck
npm install --registry https://registry.npmjs.org
```

> ⚠️ Sempre use `--registry https://registry.npmjs.org` para evitar conflitos com o registry do Mapbox.

### 2. Crie o arquivo `.env` na raiz do projeto
Siga o exemplo do arquivo .env_Example

```
EXPO_PUBLIC_MAPBOX_TOKEN= token_pk.
RNMAPBOX_MAPS_DOWNLOAD_TOKEN=sk.SEU_TOKEN_SECRETO
```

> ⚠️ Nunca commite esse arquivo! Ele está no `.gitignore`.

### 3. Configure o Java 17 no Gradle

Abra o arquivo `android/gradle.properties` e adicione no final:

```properties
org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.x.x-hotspot
```

> Ajuste o caminho conforme a versão instalada no pc. Para verificar, rode `java -version` no terminal. Se tiver chocolatey, só instala a versão 17 junto.

```bash
choco install temurin17 -y
```
---

## Rodando o projeto

### ⚠️ IMPORTANTE: sempre use `npx expo run:android`

O Mapbox usa módulos nativos e **não funciona** com `npx expo start`. Use sempre `npx expo run:android`.

### Passo a passo completo (primeira vez ou após `--clean`)

**1.** Rode o prebuild:

```bash
npx expo prebuild --clean
```

**2.** Recrie o arquivo `android/local.properties` (o `--clean` apaga esse arquivo!):

```properties
sdk.dir=C:/Users/SEU_USUARIO/AppData/Local/Android/Sdk
```

> Substitua `SEU_USUARIO` pelo seu usuário do Windows. Para descobrir, rode `echo %USERNAME%` no CMD.

**3.** Recrie o arquivo `.npmrc` na raiz do projeto (o `--clean` apaga esse arquivo!):

```
//api.mapbox.com/downloads/v2/releases/npm/:_authToken=sk.SEU_TOKEN_SECRETO
```

**4.** Conecte seu dispositivo Android via USB com depuração USB ativada, ou abra o emulador no Android Studio.

**5.** Rode o app:

```bash
npx expo run:android
```

---

## Rodando no dia a dia (sem `--clean`)

Após a configuração inicial, para rodar normalmente:

```bash
npx expo run:android
```

> ⚠️ Só use `--clean` quando mudar algo no `app.json` ou instalar/remover pacotes nativos. Lembre-se de recriar o `local.properties` e o `.npmrc` depois!

---

## Arquivos que o `--clean` apaga e precisam ser recriados

Toda vez que rodar `npx expo prebuild --clean`, você precisa recriar manualmente:

1. `android/local.properties`
2. `.npmrc` (na raiz do projeto)




---

## Problemas comuns

### ❌ `SDK location not found`
O arquivo `android/local.properties` foi apagado pelo `--clean`. Recrie-o com o caminho do Android SDK.

### ❌ `403 Forbidden` ao baixar o Mapbox
O token `sk.` não está configurado corretamente. Verifique:
- O arquivo `android/gradle.properties` tem a linha `MAPBOX_DOWNLOADS_TOKEN=sk.xxx`
- O arquivo `.env` tem `RNMAPBOX_MAPS_DOWNLOAD_TOKEN=sk.xxx`

### ❌ Erro de compilação Kotlin/Gradle
Verifique se está usando o Java 17. Rode `java -version` no terminal para confirmar. Adicione o caminho do JDK 17 no `android/gradle.properties`.

### ❌ `native code not available` ou mapa não aparece
Você está rodando com `npx expo start`. O Mapbox **não funciona** com Expo Go ou `expo start`. Use sempre `npx expo run:android`.

### ❌ Erro 404 ao instalar pacotes npm
O `.npmrc` está redirecionando pro servidor do Mapbox. Use sempre:
```bash
npm install PACOTE --registry https://registry.npmjs.org
```

### ❌ `Property 'pk' doesn't exist`
O token `pk.` no código está sem aspas. Verifique no `MapScreen.jsx`:
```jsx
Mapbox.setAccessToken("pk.SEU_TOKEN_AQUI"); // ← aspas obrigatórias!
```