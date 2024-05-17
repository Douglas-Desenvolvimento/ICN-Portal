import React from 'react'
import Prove_InsertPhone from '../components/prove_component/Prove_InsertPhone';



const TS_teste = ({phoneNumber}) => {
    console.log(phoneNumber);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQYXlmb25lIiwiZXhwIjoxNzE1MjQ3NjMzLCJpYXQiOjE3MTUyNDA0MzMsImF1ZCI6WyJQYXlmb25lIl0sInN1YiI6IkNsaWVudEF1dGgiLCJzaWQiOiIyYWIwMmE2MS1iYmEzLTQ4OTgtOGFhYi0xMDQxMjk3ZWJmMWQiLCJhdXRoIjp7ImNpZCI6Ik9BS000REJqd2FvQVljZ2s0TFA5VUFUIn19.JV1uFPnvVNr-NjKVMNcUQUzcsQECW1v-R5cn9cQr0p0");
    myHeaders.append("pf-subclientid", "Oakmont-Identity");
    
    const raw = JSON.stringify({
      "requestId": "123457",
      "phoneNumber": phoneNumber,
      "details": "true"
    });
    
    const requestOptions = {
      method: "POST",
      mode: 'no-cors',
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://uat.global.proveapis.com/trust/v1", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

export default TS_teste
