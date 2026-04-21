import { firestore, auth } from './firebaseConfig';

const COLLECTION = 'complaints';

// ===========================
// CRIAR avaliação
// ===========================
export const criarAvaliacao = async ({ unidade, titulo, descricao }) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const docRef = await firestore().collection(COLLECTION).add({
      userId: user.uid,
      userName: user.displayName || 'Anônimo',
      unidade,
      titulo,
      descricao,
      status: 'Em análise',
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    return { success: false, error: error.message };
  }
};

// ===========================
// ATUALIZAR status
// ===========================
export const atualizarStatus = async (id, novoStatus) => {
  try {
    await firestore().collection(COLLECTION).doc(id).update({
      status: novoStatus,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    return { success: false, error: error.message };
  }
};

// ===========================
// OUVIR avaliações do usuário em tempo real
// ===========================
export const ouvirAvaliacoesDoUsuario = (callback) => {
  const user = auth().currentUser;
  if (!user) return () => {};

  return firestore()
    .collection(COLLECTION)
    .where('userId', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        const avaliacoes = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            unidade: data.unidade,
            titulo: data.titulo,
            descricao: data.descricao,
            status: data.status,
            // Formatar a data para o padrão já usado nas telas
            data: data.createdAt
              ? new Date(data.createdAt.toDate()).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })
              : '...',
          };
        });
        callback(avaliacoes);
      },
      (error) => {
        console.error('Erro ao ouvir avaliações:', error);
      }
    );
};
