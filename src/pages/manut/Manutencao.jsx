import React, { useState, useEffect } from "react";
import * as core from "@coreui/react";
import useAuthentication from "../../hooks/useAuthentication.jsx";
import Admins from "../UsersRolesViews/Admins.jsx";
import Analyst from "../UsersRolesViews/Analyst.jsx";
import AuditPage from "../audit/Audit.jsx";
import TimestampFilterForm from "../../components/TimestampFilterForm.jsx";
import Prove_InsertPhone from "../../components/prove_component/Prove_InsertPhone.jsx";
import Botoes from "./botoes.jsx";
import Prove_TrustScore from "../../components/prove_component/Prove_TrustScore.jsx";
import NavBar from '../../components/navBar.jsx'
import Prove from '../prove/Prove.jsx'
import TableComponent from "../../hooks/IcdProvePRD/IcnProveActivity.jsx";
import IcnAllTable from "../../components/audit_component/icnAllTable.jsx";




export let orgservices = [];
export let userrole = [];

const Manutencao = () => {
  // const { getLoggedInUser } = useAuthentication();
  // const [userData, setUserData] = useState(null);
  // const [activeKey, setActiveKey] = useState(); 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = await getLoggedInUser();
  //     setUserData(user);
  //     if (user) {
  //       orgservices = user.services;
  //       userrole = user.role;
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (!userData) {
  //   return null;
  // }

  // console.log("manut - Services:", orgservices);

  // const handleClick = (key) => {
  //   setActiveKey(key); // Atualize activeKey com o índice da aba clicada
  // };

  return (
    <div>
    <NavBar />
    
       
    <div>
    <Prove />

    
  </div> <br />
  <br />
  <IcnAllTable />
  <TableComponent />
  
  
  </div>
  

);
};
export default Manutencao;
