import { fetchDataToken } from './icnProveGetTokenPrd'; // Importe a função fetchDataToken do arquivo correspondente

async function IcnProveTrustV1Endpoint(formattedPhoneNumber) {
  try {
   
   // console.log('Access token:', accessToken); // Log para verificar o token
    console.log('Formatted Phone Number:', formattedPhoneNumber); // Log para verificar o número de telefone formatado

    const url = 'https://213.163.247.230:8000/prove/cases/tscore';
    const requestOptions = {
      method: 'POST',
      referrerPolicy: 'unsafe-url',
      // mode: 'no-cors',
     
      redirect: "follow",
      
      headers: {
        "Content-Type": "application/json",
        "i-token": "ZmxvEQwKcY9DGoKYmMGU",
        
      },
      body: JSON.stringify({
        "phoneNumber": formattedPhoneNumber,
         "siteid": "2024000",
        "username": "maria@example.com"
    
      })
    };

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    console.log("TS: ", responseData.response.trustScore)
    let trustScore = responseData.response.trustScore;
    console.log("Variável TrustScore: ", trustScore);
    return responseData;
    
  } catch (error) {
    console.error('Erro ao chamar a API Trust:', error);
    throw error;
  }
}

export default IcnProveTrustV1Endpoint;




//trhust antigo

/*
async function IcnProveTrustV1Endpoint(formattedPhoneNumber) {
  try {
    // Obtenha o access token chamando a função fetchDataToken
    const accessToken = await fetchDataToken();

    // Verifique se o access token foi obtido com sucesso
    if (!accessToken) {
      throw new Error('Access token não foi obtido com sucesso');
    }

    console.log('Access token:', accessToken); // Log para verificar o token
    console.log('Formatted Phone Number:', formattedPhoneNumber); // Log para verificar o número de telefone formatado

    const url = 'https://global.proveapis.com/trust/v1';
    const requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'pf-subclientid': 'Oakmont-Identity'
      },
      body: JSON.stringify({
        siteid: '2024000',
        phoneNumber: formattedPhoneNumber,
        details: true,
        username: "joão"
      })
    };

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Erro ao chamar a API Trust:', error);
    throw error;
  }
}

export default IcnProveTrustV1Endpoint; */