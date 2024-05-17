import React, { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import apiAccess from "../hooks/apiAcess.jsx";

const DetailApiData = () => {
  const [detailData, setDetailData] = useState(null);
  const [servicesFetched, setServicesFetched] = useState(false);
  const { postData } = apiAccess();
  const { getLoggedInUser } = useAuthentication();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = getLoggedInUser();
        const siteid = userData && userData.siteid;

        if (!siteid) {
          console.error("Erro: siteid do usuário não encontrado.");
          return;
        }

        console.log("Buscando dados das APIs...");

        // Busca detalhes dos serviços
        const detailServiceData = await postData(
          `api/services/siteid?siteid=${siteid}`
        );

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

    if (!servicesFetched) {
      fetchData();
    }
  }, [getLoggedInUser, postData, servicesFetched]);

  const processDetailRawData = (rawData) => {
    const labels = [];
    const datasets = [];

    rawData.forEach((item) => {
      labels.push(item.serviceName); // Adiciona o nome do serviço como label

      // Cria um objeto para cada serviço no formato esperado pelo gráfico
      const serviceData = {
        label: item.serviceName,
        data: [], // Array para armazenar os dados do serviço
      };

      // Adiciona os dados do serviço ao array de datasets
      item.data.forEach((dataItem) => {
        // Adiciona os dados específicos deste item ao array de dados do serviço
        serviceData.data.push({
          reqid: dataItem.reqid,
          phone: dataItem.phone,
          date_time: dataItem.date_time,
          status: dataItem.status,
          siteid: dataItem.siteid,
        });
      });

      // Adiciona o objeto do serviço ao array de datasets
      datasets.push(serviceData);
    });

    return { labels, datasets };
  };

  return detailData;
};

export default DetailApiData;
