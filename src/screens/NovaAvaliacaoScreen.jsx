import React, { useState } from "react";
import {
  View,
  Text,
 StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  Image
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useAvaliacoes } from "../services/AvaliacoesContext";

const upas = [
  "UPA Central",
  "UPA Norte",
  "UPA Sul",
  "UPA Leste",
  "UPA Oeste",
  "Posto de Saúde",
  "UBS Norte",
  "UBS Sul",
  "Hospital Municipal",
  "Pronto Socorro Central"
];

const tiposProblema = [
  "Atendimento",
  "Limpeza",
  "Falta de remédios",
  "Infraestrutura",
  "Funcionários",
  "Demora",
  "Outro"
];

export default function NovaAvaliacaoScreen({ navigation }) {

  const { adicionarAvaliacao } = useAvaliacoes();

  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);

  const [upaSelecionada, setUpaSelecionada] =
    useState("Selecione uma UPA");

  const [tipoSelecionado, setTipoSelecionado] =
    useState("Selecione o tipo");

  const [modalUpa, setModalUpa] = useState(false);
  const [modalTipo, setModalTipo] = useState(false);

  async function abrirCamera() {

    const permissao =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão negada",
        "Você precisa permitir acesso à câmera."
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  async function abrirGaleria() {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão negada",
        "Você precisa permitir acesso à galeria."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  function selecionarImagem() {

    Alert.alert(
      "Adicionar foto",
      "Escolha uma opção",
      [
        {
          text: "📷 Câmera",
          onPress: abrirCamera
        },
        {
          text: "🖼️ Galeria",
          onPress: abrirGaleria
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  }

  function enviarAvaliacao() {

    if (upaSelecionada === "Selecione uma UPA") {
      Alert.alert(
        "Atenção",
        "Selecione uma Unidade de Saúde!"
      );
      return;
    }

    if (tipoSelecionado === "Selecione o tipo") {
      Alert.alert(
        "Atenção",
        "Selecione o tipo de problema!"
      );
      return;
    }

    if (descricao.trim().length < 10) {
      Alert.alert(
        "Atenção",
        "Descreva melhor o ocorrido (mínimo 10 caracteres)!"
      );
      return;
    }

    adicionarAvaliacao({
      unidade: upaSelecionada,
      titulo: tipoSelecionado,
      descricao: descricao,
      imagem: imagem
    });

    Alert.alert(
      "✅ Enviado!",
      "Sua avaliação foi registrada com sucesso!",
      [
        {
          text: "Ver avaliações",
          onPress: () => navigation.goBack()
        }
      ]
    );

    setDescricao("");
    setImagem(null);

    setUpaSelecionada("Selecione uma UPA");
    setTipoSelecionado("Selecione o tipo");
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >

      <Text style={styles.title}>
        Nova Avaliação
      </Text>

      <Text style={styles.label}>
        Sobre o que deseja reportar?
      </Text>

      {/* Seleção de UPA */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalUpa(true)}
      >

        <Text style={styles.cardLabel}>
          Unidade de Saúde
        </Text>

        <View style={styles.cardRow}>

          <Text
            style={[
              styles.cardValue,
              upaSelecionada === "Selecione uma UPA" &&
              { color: "#999" }
            ]}
          >
            {upaSelecionada}
          </Text>

          <Text style={styles.chevron}>
            ⌄
          </Text>

        </View>

      </TouchableOpacity>

      {/* Seleção de Tipo */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalTipo(true)}
      >

        <Text style={styles.cardLabel}>
          Tipo de problema
        </Text>

        <View style={styles.cardRow}>

          <Text
            style={[
              styles.cardValue,
              tipoSelecionado === "Selecione o tipo" &&
              { color: "#999" }
            ]}
          >
            {tipoSelecionado}
          </Text>

          <Text style={styles.chevron}>
            ⌄
          </Text>

        </View>

      </TouchableOpacity>

      {/* Descrição */}
      <Text style={styles.label}>
        Descreva o ocorrido
      </Text>

      <View style={styles.textAreaContainer}>

        <TextInput
          style={styles.textArea}
          placeholder="Explique o que aconteceu..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.counter}>
          {descricao.length}/500
        </Text>

      </View>

      {/* Botão Foto */}
      <TouchableOpacity
        style={styles.photoButton}
        onPress={selecionarImagem}
      >
        <Text style={styles.photoButtonText}>
          📷 Adicionar foto
        </Text>
      </TouchableOpacity>

      {/* Preview */}
      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={styles.preview}
        />
      )}

      {/* Botão Enviar */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={enviarAvaliacao}
      >
        <Text style={styles.submitButtonText}>
          Enviar
        </Text>
      </TouchableOpacity>

      {/* Modal UPA */}
      <Modal
        visible={modalUpa}
        transparent
        animationType="slide"
        onRequestClose={() => setModalUpa(false)}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitulo}>
              Selecione a Unidade de Saúde
            </Text>

            <FlatList
              data={upas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={[
                    styles.opcaoBotao,
                    upaSelecionada === item &&
                    styles.opcaoAtiva
                  ]}
                  onPress={() => {
                    setUpaSelecionada(item);
                    setModalUpa(false);
                  }}
                >

                  <Text
                    style={[
                      styles.opcaoTexto,
                      upaSelecionada === item &&
                      styles.opcaoTextoAtivo
                    ]}
                  >
                    {item}
                  </Text>

                </TouchableOpacity>

              )}
            />

            <TouchableOpacity
              style={styles.cancelarBotao}
              onPress={() => setModalUpa(false)}
            >
              <Text style={styles.cancelarTexto}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      {/* Modal Tipo */}
      <Modal
        visible={modalTipo}
        transparent
        animationType="slide"
        onRequestClose={() => setModalTipo(false)}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitulo}>
              Selecione o tipo de problema
            </Text>

            <FlatList
              data={tiposProblema}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={[
                    styles.opcaoBotao,
                    tipoSelecionado === item &&
                    styles.opcaoAtiva
                  ]}
                  onPress={() => {
                    setTipoSelecionado(item);
                    setModalTipo(false);
                  }}
                >

                  <Text
                    style={[
                      styles.opcaoTexto,
                      tipoSelecionado === item &&
                      styles.opcaoTextoAtivo
                    ]}
                  >
                    {item}
                  </Text>

                </TouchableOpacity>

              )}
            />

            <TouchableOpacity
              style={styles.cancelarBotao}
              onPress={() => setModalTipo(false)}
            >
              <Text style={styles.cancelarTexto}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F6F5"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E3D34",
    marginTop: 10
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 15,
    color: "#1E3D34"
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  cardLabel: {
    fontSize: 13,
    color: "#777",
    marginBottom: 4
  },

  cardValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3D34"
  },

  chevron: {
    fontSize: 18,
    color: "#777"
  },

  textAreaContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    elevation: 2
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#333"
  },

  counter: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#999",
    marginTop: 4
  },

  photoButton: {
    backgroundColor: "#E6F4EC",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20
  },

  photoButtonText: {
    color: "#2E7D5B",
    fontWeight: "600",
    fontSize: 15
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginTop: 15
  },

  submitButton: {
    backgroundColor: "#2E7D5B",
    padding: 18,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40
  },

  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end"
  },

  modalBox: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    maxHeight: "70%"
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3D34",
    marginBottom: 15
  },

  opcaoBotao: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F4F6F5",
    marginBottom: 10,
    alignItems: "center"
  },

  opcaoAtiva: {
    backgroundColor: "#2E7D5B"
  },

  opcaoTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E3D34"
  },

  opcaoTextoAtivo: {
    color: "#FFF"
  },

  cancelarBotao: {
    padding: 15,
    alignItems: "center",
    marginTop: 5
  },

  cancelarTexto: {
    color: "#999",
    fontSize: 14
  }

});