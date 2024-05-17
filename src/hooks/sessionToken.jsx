import { useState, useEffect } from 'react';
import axios from 'axios';


// Função para verificar se a sessão expirou
function isSessionExpired(expirationTime) {
  return expirationTime < Date.now();
}

// Função para verificar se houve inatividade do usuário
function hasUserBeenInactive(inactivityTimeout) {
  const lastActivityTime = sessionStorage.getItem('lastActivityTime');
  return lastActivityTime && Date.now() - parseInt(lastActivityTime) > inactivityTimeout;
}

// Função para realizar logout se a sessão expirar por inatividade do usuário
export function checkSessionExpiration(setVisible) {
  const expirationTime = sessionStorage.getItem('expirationTime');
  const inactivityTimeout = 10 * 60 * 1000; // Tempo de inatividade em milissegundos (2 minutos)

  const isSessionActive = !hasUserBeenInactive(inactivityTimeout);

  if (expirationTime && isSessionActive) {
    if (isSessionExpired(parseInt(expirationTime))) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expirationTime');
      // Exibir alerta de sessão expirada
      setVisible(true);
    } else {
      renewToken(sessionStorage.getItem('token'))
        .then(() => {
          // Token renovado com sucesso, atualize o tempo de expiração
          const newExpirationTime = Date.now() + (30 * 60 * 1000); // Novo tempo de expiração (2 minutos)
          sessionStorage.setItem('expirationTime', newExpirationTime.toString());
          console.log('Token renovado com sucesso. Novo tempo de expiração:', newExpirationTime);
        })
        .catch(error => {
          console.error('Erro ao renovar o token:', error);
          // Exibir alerta de sessão expirada em caso de erro na renovação
          setVisible(true);
        });
    }
  } else {
    // Sessão expirada por inatividade do usuário
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    // Exibir alerta de sessão expirada
    setVisible(true);
    
    console.log('Sessão expirada por inatividade do usuário');
  }
}

// Função para renovar o token fazendo uma requisição à rota /api/renew-token
async function renewToken(oldToken) {
  try {
    const response = await axios.post('http://localhost:3000/api/renew-token', null, {
      headers: {
        Authorization: `Bearer ${oldToken}` // Inclui o token antigo no cabeçalho Authorization
      }
    });
    const newToken = response.data.token;
    const expiresIn = response.data.expiresIn;

    if (!newToken || !expiresIn) {
      throw new Error('Resposta inválida ao renovar o token');
    }

    // Lógica para tratar a resposta da renovação do token, se necessário
    console.log('Token renovado com sucesso:', newToken, expiresIn);
  } catch (error) {
    throw error;
  }
}

// Função para atualizar o último horário de atividade do usuário
function updateUserActivity() {
  sessionStorage.setItem('lastActivityTime', Date.now().toString());
}

// Função para configurar a verificação de expiração da sessão em intervalos regulares
export function setupSessionExpirationCheck(setVisible) {
 
  // Verificar a expiração da sessão periodicamente (por exemplo, a cada minuto)
  setInterval(() => {
    checkSessionExpiration(setVisible);
  }, 3 * 60 * 1000); // Verificar a cada 2 minutos

  // Atualizar o horário de atividade do usuário quando houver atividade na página
  document.addEventListener('click', updateUserActivity);
  document.addEventListener('keydown', updateUserActivity);
}

// Hook customizado para gerenciar a sessão do usuário
export function useSession() {
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
   // setupSessionExpirationCheck(setVisible);
    //checkSessionExpiration(setVisible);
  }, []);

  return { visible };
}
