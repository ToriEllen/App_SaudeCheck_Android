import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function NotificacoesScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.head}>
        <View style={styles.headerContent}>

          <View>
            <Text style={styles.headerTitle}>Notificações</Text>
            <Text style={styles.headerSubtitle}>
              Acompanhe suas atualizações
            </Text>
          </View>

          <Pressable
            style={styles.avatarCircle}
            onPress={() => navigation.navigate("Perfil")}
          >
            <Feather
              name="user"
              size={35}
              color="rgba(255, 255, 255, 0.77)"
            />
          </Pressable>

        </View>
      </View>

      <ScrollView
        style={styles.main}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.notificacaoVerde}>

          <View style={styles.iconArea}>
            <Ionicons
              name="checkmark-circle"
              size={28}
              color="#1B6B4A"
            />
          </View>

          <View style={styles.textos}>
            <Text style={styles.titulo}>
              Avaliação resolvida
            </Text>

            <Text style={styles.descricao}>
              Sua avaliação da UPA Centro foi analisada.
            </Text>

            <Text style={styles.hora}>
              Há 2 horas
            </Text>
          </View>

        </View>

        <View style={styles.notificacaoAmarela}>

          <View style={styles.iconArea}>
            <Ionicons
              name="alert-circle"
              size={28}
              color="#E8A020"
            />
          </View>

          <View style={styles.textos}>
            <Text style={styles.titulo}>
              Em análise
            </Text>

            <Text style={styles.descricao}>
              Sua reclamação está sendo avaliada pela equipe.
            </Text>

            <Text style={styles.hora}>
              Ontem
            </Text>
          </View>

        </View>

        <View style={styles.notificacaoPadrao}>

          <View style={styles.iconArea}>
            <Ionicons
              name="notifications"
              size={28}
              color="#2A8A60"
            />
          </View>

          <View style={styles.textos}>
            <Text style={styles.titulo}>
              Nova atualização
            </Text>

            <Text style={styles.descricao}>
              O sistema recebeu novas unidades próximas.
            </Text>

            <Text style={styles.hora}>
              2 dias atrás
            </Text>
          </View>

        </View>

        <View style={styles.notificacaoPadrao}>

          <View style={styles.iconArea}>
            <Ionicons
              name="document-text"
              size={28}
              color="#2A8A60"
            />
          </View>

          <View style={styles.textos}>
            <Text style={styles.titulo}>
              Relatório enviado
            </Text>

            <Text style={styles.descricao}>
              Seu feedback foi encaminhado com sucesso.
            </Text>

            <Text style={styles.hora}>
              3 dias atrás
            </Text>
          </View>

        </View>

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  head: {
    backgroundColor: "#1B6B4A",
    paddingHorizontal: 30,
    paddingTop: 56,
    paddingBottom: 50,
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 17,
    color: "#A8E6C8",
    marginTop: 2,
  },

  avatarCircle: {
    width: 46,
    height: 46,
    padding: 5,
    borderRadius: 26,
    backgroundColor: "#2A8A60",
  },

  main: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  notificacaoVerde: {
    width: "100%",
    backgroundColor: "#E8F5EE",
    borderColor: "#C8E6D4",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
  },

  notificacaoAmarela: {
    width: "100%",
    backgroundColor: "#FFF3CD",
    borderColor: "#E8A020",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
  },

  notificacaoPadrao: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
  },

  iconArea: {
    marginRight: 14,
    marginTop: 2,
  },

  textos: {
    flex: 1,
  },

  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: "#333333",
  },

  descricao: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
    lineHeight: 20,
  },

  hora: {
    fontSize: 12,
    color: "#888888",
    marginTop: 10,
  },

})