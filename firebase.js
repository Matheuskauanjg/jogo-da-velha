import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjuGVAiIEYz5mg_S6OEJ2dFsjrRb4MHS0",
    authDomain: "velha-1f5de.firebaseapp.com",
    projectId: "velha-1f5de",
    storageBucket: "velha-1f5de.firebasestorage.app",
    messagingSenderId: "717120456349",
    appId: "1:717120456349:web:764c38781ecf88c44bb674",
    measurementId: "G-L0CQ901W2Y"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar os dados de uma partida
export const saveGame = async (playerScore, aiScore) => {
  try {
    const docRef = await addDoc(collection(db, "games"), {
      playerScore: playerScore,
      aiScore: aiScore,
      timestamp: new Date().toISOString()
    });
    console.log("Partida salva com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao salvar partida: ", e);
  }
};

// Função para pegar todos os jogos armazenados
export const getAllGames = async () => {
  const querySnapshot = await getDocs(collection(db, "games"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
