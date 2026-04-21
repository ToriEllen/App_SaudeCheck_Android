import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from "react-native";
import { useAvaliacoes } from "../services/AvaliacoesContext";

const statusOpcoes = [
  { label: "✅ Problema foi resolvido", valor: "Resolvida"  },
  { label: "⏳ Ainda está pendente",    valor: "Pendente"   },
  { label: "🔍 Em análise",             valor: "Em análise" },
];

function getStatusStyle(status) {
  switch (status) {
    case "Resolvida":
      return { backgroundColor: "#D4EDDA", color: "#155724" };
    case "Pendente":
      return { backgroundColor: "#FFF3CD", color: "#856404" };
    case "Em análise":
      return { backgroundColor: "#F8D7DA", color: "#721C24" };
    default:
      return {};
  }
}

export default function MinhasAvaliacoesScreen({ navigation }) {
  const [filtro, setFiltro] = useState("Todas");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [reclamacaoSelecionada, setReclamacaoSelecionada] = useState(null);

  // 👇 CORREÇÃO: Primeiro obtemos os dados do contexto
  const { avaliacoes, alterarStatus: alterarStatusContext, loading } = useAvaliacoes();

  // 👇 Só depois usamos os dados (após verificar loading)
  const filtradas = avaliacoes.filter((item) => {
    if (filtro === "Todas") return true;
    return item.status === filtro;
  });

  // Estado de loading
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6F5' }}>
        <ActivityIndicator size="large" color="#2E7D5B" />
        <Text style={{ marginTop: 10, color: '#777' }}>Carregando avaliações...</Text>
      </View>
    );
  }

  function abrirModal(item) {
    setReclamacaoSelecionada(item);
    setModalVisivel(true);
  }

  function alterarStatus(novoStatus) {
    alterarStatusContext(reclamacaoSelecionada.id, novoStatus);
    setModalVisivel(false);
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Minhas Reclamações</Text>

        {/* Filtros */}
        <View style={styles.filtros}>
          {["Todas", "Pendente", "Resolvida", "Em análise"].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filtroBotao, filtro === f && styles.filtroAtivo]}
              onPress={() => setFiltro(f)}
            >
              <Text style={[styles.filtroTexto, filtro === f && styles.filtroTextoAtivo]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista vazia */}
        {filtradas.length === 0 && (
          <View style={styles.vazio}>
            <Text style={styles.vazioTexto}>Nenhuma avaliação encontrada.</Text>
          </View>
        )}

        {/* Lista */}
        {filtradas.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.unidade}>{item.unidade}</Text>
              <View style={[
                styles.ponto,
                item.status === "Resolvida"  && { backgroundColor: "#2E7D5B" },
                item.status === "Pendente"   && { backgroundColor: "#F0A500" },
                item.status === "Em análise" && { backgroundColor: "#E53935" },
              ]} />
            </View>

            <Text style={styles.titulo}>{item.titulo}</Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity onPress={() => abrirModal(item)}>
                <Text style={[styles.status, getStatusStyle(item.status)]}>
                  {item.status} ✏️
                </Text>
              </TouchableOpacity>
              <Text style={styles.data}>{item.data}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => navigation.navigate("NovaAvaliacao")}
      >
        <Text style={styles.botaoFlutuanteTexto}>+ Nova Avaliação</Text>
      </TouchableOpacity>

      {/* Modal de status */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Como está sua reclamação?</Text>
            <Text style={styles.modalSubtitulo}>
              {reclamacaoSelecionada?.titulo}
            </Text>

            {statusOpcoes.map((opcao) => (
              <TouchableOpacity
                key={opcao.valor}
                style={[
                  styles.opcaoBotao,
                  reclamacaoSelecionada?.status === opcao.valor && styles.opcaoAtiva
                ]}
                onPress={() => alterarStatus(opcao.valor)}
              >
                <Text style={[
                  styles.opcaoTexto,
                  reclamacaoSelecionada?.status === opcao.valor && styles.opcaoTextoAtivo
                ]}>
                  {opcao.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelarBotao}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.cancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F4F6F5" },
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#1E3D34" },
  filtros: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20, gap: 8 },
  filtroBotao: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: "#E6F4EC" },
  filtroAtivo: { backgroundColor: "#2E7D5B" },
  filtroTexto: { color: "#2E7D5B", fontWeight: "600", fontSize: 13 },
  filtroTextoAtivo: { color: "#FFF" },
  vazio: { alignItems: "center", marginTop: 50 },
  vazioTexto: { color: "#999", fontSize: 15 },
  card: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 12, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  unidade: { fontSize: 13, color: "#777" },
  ponto: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#2E7D5B" },
  titulo: { fontSize: 16, fontWeight: "600", marginVertical: 8, color: "#1E3D34" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  status: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontSize: 12, fontWeight: "600", overflow: "hidden" },
  data: { fontSize: 12, color: "#777" },
  botaoFlutuante: { position: "absolute", bottom: 25, right: 20, backgroundColor: "#2E7D5B", paddingHorizontal: 20, paddingVertical: 14, borderRadius: 30, elevation: 5 },
  botaoFlutuanteTexto: { color: "#FFF", fontWeight: "bold", fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalBox: { backgroundColor: "#FFF", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
  modalTitulo: { fontSize: 18, fontWeight: "bold", color: "#1E3D34", marginBottom: 5 },
  modalSubtitulo: { fontSize: 14, color: "#777", marginBottom: 20 },
  opcaoBotao: { padding: 15, borderRadius: 12, backgroundColor: "#F4F6F5", marginBottom: 10, alignItems: "center" },
  opcaoAtiva: { backgroundColor: "#2E7D5B" },
  opcaoTexto: { fontSize: 15, fontWeight: "600", color: "#1E3D34" },
  opcaoTextoAtiva: { color: "#FFF" },
  cancelarBotao: { padding: 15, alignItems: "center", marginTop: 5 },
  cancelarTexto: { color: "#999", fontSize: 14 }
});