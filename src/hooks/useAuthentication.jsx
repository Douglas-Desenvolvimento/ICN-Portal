import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //login
const login = async (loginid, pwd) =>{
  try{
      setError('');
      const loginResponse = await fetch('http://localhost:3000/api/usertoken', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({loginid, pwd})
      });

      if(!loginResponse.ok){
          throw new Error('Falha ao fazer login.');
      }

      const { token, expirationTime, user: loggedInUser } = await loginResponse.json(); // Obtenha o token JWT e o nome de usuário da resposta
    // Armazene o token JWT e o nome de usuário localmente
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('expirationTime', expirationTime);
    //SpeechSynthesisUtterance.setItem('loggedInUser', JSON.stringify(loggedInUser));
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    const usuario = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log('API - Token JWT:', token);
    console.log('API - Tempo de expiração:', expirationTime);
    console.log('API - Informações do usuário:', usuario);

    // Redireciona para a página desejada após o login
    navigate('/home');
    
    // Retorna true se o usuário for autenticado com sucesso
    return { success: true };
  } catch (error) {
    setError(error.message);
    return { success: false, error: error.message };
  }
}



//logout

const logout = () => {
  // Remova os itens do localStorage relacionados à autenticação
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('expirationTime');
  sessionStorage.removeItem('loggedInUser');

  // Redirecione para a página de login após o logout
  navigate('/');
};

const getLoggedInUser = () => {
  try {
    const usuario = JSON.parse(sessionStorage.getItem('loggedInUser'));
    return usuario;
  } catch (error) {
    return null;
  }
};


return { login, logout, error, getLoggedInUser };













};
export default useAuthentication;



//login antigo
  /* const login = async (username, password) => {
    try {
      setError('');

      // Requisição para fazer o login
      const loginResponse = await fetch('http://localhost:3000/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!loginResponse.ok) {
        throw new Error('Falha ao fazer login.');
      }

      const { token, expirationTime, user: loggedInUser } = await loginResponse.json(); // Obtenha o token JWT e o nome de usuário da resposta
      // Armazene o token JWT e o nome de usuário localmente
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
      console.log('Token JWT:', token);
      console.log('Tempo de expiração:', expirationTime);
      console.log('Informações do usuário:', usuario);

      // Redireciona para a página desejada após o login
      navigate('/home');
      
      // Retorna true se o usuário for autenticado com sucesso
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
    
  };

  const logout = () => {
    // Remova os itens do localStorage relacionados à autenticação
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('loggedInUser');

    // Redirecione para a página de login após o logout
    navigate('/');
  };

  const getLoggedInUser = () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('loggedInUser'));
      return usuario;
    } catch (error) {
      return null;
    }
  };

  return { login, logout, error, getLoggedInUser };
 */

