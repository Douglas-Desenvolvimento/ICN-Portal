import React, { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import IcnApiAccess from "../hooks/icnApiAccess";

const icnDetailedEventsHook = () => {
  const [detailData, setDetailData] = useState(null);
  const [servicesFetched, setServicesFetched] = useState(false);
  const { getData } = IcnApiAccess();
  const { getLoggedInUser } = useAuthentication();

  const fetchData = async (startTimestamp, endTimestamp) => {
    try {
      const userData = getLoggedInUser();
      const siteid = userData && userData.siteid;

      if (!siteid) {
        console.error("Erro: siteid do usuário não encontrado.");
        return;
      }

      console.log("Buscando dados das APIs...");

      // Busca detalhes dos serviços com os filtros de timestamp
      const detailServiceData = await getData(
        `api/detailedevents?start_timestamp=${startTimestamp}&end_timestamp=${endTimestamp}`
      );
        console.log(detailServiceData, startTimestamp)
      if (detailServiceData) {
        console.log("Detalhes dos serviços obtidos:", detailServiceData);
        const newDetailData = processDetailRawData(detailServiceData);
        setDetailData(newDetailData);
      } else {
        console.error("Erro: detalhes dos serviços não encontrados.");
      }

      setServicesFetched(true);
    } catch (error) {
      console.error("Erro ao buscar os serviços:", error.message);
    }
  };

  // ...

  return { detailData, fetchData };
};

export default icnDetailedEventsHook;
