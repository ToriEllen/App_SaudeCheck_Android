import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import {
  criarAvaliacao,
  atualizarStatus,
  ouvirAvaliacoesDoUsuario,
} from './complaintService';

const AvaliacoesContext = createContext();

export function AvaliacoesProvider({ children }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFirestore = () => {};

    // Espera o Firebase confirmar o usuário logado
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      // Limpar listener anterior se existir
      unsubscribeFirestore();

      if (user) {
        // Usuário logado — ouvir as avaliações dele
        unsubscribeFirestore = ouvirAvaliacoesDoUsuario((dados) => {
          setAvaliacoes(dados);
          setLoading(false);
        });
      } else {
        // Usuário não logado — limpar lista
        setAvaliacoes([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  async function adicionarAvaliacao(novaAvaliacao) {
    const resultado = await criarAvaliacao(novaAvaliacao);
    if (!resultado.success) {
      console.error('Erro ao salvar avaliação:', resultado.error);
    }
  }

  async function alterarStatus(id, novoStatus) {
    const resultado = await atualizarStatus(id, novoStatus);
    if (!resultado.success) {
      console.error('Erro ao alterar status:', resultado.error);
    }
  }

  return (
    <AvaliacoesContext.Provider
      value={{ avaliacoes, adicionarAvaliacao, alterarStatus, loading }}
    >
      {children}
    </AvaliacoesContext.Provider>
  );
}

export function useAvaliacoes() {
  return useContext(AvaliacoesContext);
}