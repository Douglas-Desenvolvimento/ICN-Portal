import React, { useState } from "react";
import icnDetailedEventsHook from '../hooks/icnDetailedEventsHook';

const TimestampFilterForm = () => {
  const [startTimestamp, setStartTimestamp] = useState("");
  const [endTimestamp, setEndTimestamp] = useState("");
  const { fetchData } = icnDetailedEventsHook();

  const handleStartTimestampChange = (e) => {
    console.log('Start timestamp:', e.target.value); // Adicione esta linha para verificar o valor de entrada
    setStartTimestamp(e.target.value);
  };
  
  const handleEndTimestampChange = (e) => {
    console.log('End timestamp:', e.target.value); // Adicione esta linha para verificar o valor de entrada
    setEndTimestamp(e.target.value);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adiciona ':00Z' para incluir os segundos e a designação de zona de tempo UTC
    const startWithSeconds = `${startTimestamp}:00Z`;
    const endWithSeconds = `${endTimestamp}:00Z`;
    fetchData(startWithSeconds, endWithSeconds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Início do Timestamp:
        <input
          type="datetime-local"
          value={startTimestamp}
          onChange={handleStartTimestampChange}
        />
      </label>
      <br />
      <label>
        Fim do Timestamp:
        <input
          type="datetime-local"
          value={endTimestamp}
          onChange={handleEndTimestampChange}
        />
      </label>
      <br />
      <button type="submit">Filtrar</button>
    </form>
  );
};

export default TimestampFilterForm;
