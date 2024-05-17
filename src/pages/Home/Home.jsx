import React, { useState, useEffect } from "react";
import { useSession } from "../../hooks/sessionToken";
import * as core from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBan } from "@coreui/icons";
import NavBar from "../../components/navBar";
import useAuthentication from "../../hooks/useAuthentication.jsx";
import { useNavigate } from 'react-router-dom';
import AuditPage from '../audit/Audit.jsx'; 
import AdmUser from "../admUser/AdmUser.jsx";
import Voice from "../voice/Voice.jsx";
import Prove from "../prove/Prove.jsx"; 
import Paper from "@mui/material/Paper";

const Home = () => {
  const { visible } = useSession();
  const { getLoggedInUser, logout } = useAuthentication();
  const [usuario, setUsuario] = useState(null);
  const [orgservices, setOrgServices] = useState([]); 
  const [activeKey, setActiveKey] = useState(1); 
  const [userrole, setUserRole] = useState(""); // Defina userrole no estado do componente
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const userData = await getLoggedInUser();
        if (!usuario) {
          setUsuario(userData);
          if (userData) {
            setOrgServices(userData.services);
            setUserRole(userData.role); // Defina o valor de userrole
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error.message);
      }
    };

    fetchAllServices();
  }, [getLoggedInUser, usuario]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!usuario) {
    return null;
  }
  const handleClick = (key) => {
    setActiveKey(key); // Atualize activeKey com o índice da aba clicada
  };

  console.log("orgservices:", orgservices); 
  console.log("activeKey:", activeKey); 
  console.log("userrole:", userrole); 

  return (
    <>
    <div>
      <NavBar />
      
      {visible && (
        <core.CModal
          backdrop="static"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="StaticBackdropExampleLabel"
          className="d-flex justify-content-center"
        >
          <core.CModalHeader className="d-flex justify-content-center">
            <core.CModalTitle className="d-flex justify-content-center" id="StaticBackdropExampleLabel">Sessão Expirada, efetue um novo login</core.CModalTitle>
          </core.CModalHeader>
          <core.CModalBody className="d-flex justify-content-center align-items-center">
            <CIcon
              color="black"
              icon={cilBan}
              width={84}
              height={84}
            />
          </core.CModalBody>
          <core.CModalFooter className="d-flex justify-content-center">
            <core.CButton onClick={handleLogout} color="primary">Login</core.CButton>
          </core.CModalFooter>
        </core.CModal>
      )}
      <br />
      
      <core.CNav variant="tabs" role="tablist" >
        {orgservices.includes("AU_Portal") && (
          <core.CNavItem>
            <core.CNavLink
              href="#!"
              active={activeKey === 1}
              onClick={() => setActiveKey(1)} 
            >
              AUDIT
            </core.CNavLink>
          </core.CNavItem>
        )}
        {orgservices.includes("TS_Portal") && (
            <core.CNavItem>
              <core.CNavLink
                href="#!"
                active={activeKey === 2}
                onClick={() => handleClick(2)} // Chame handleClick com o índice da aba
              >
                PROVE
              </core.CNavLink>
            </core.CNavItem>
          )}
          {orgservices.includes("VC_Portal") && (
            <core.CNavItem>
              <core.CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => handleClick(3)} // Chame handleClick com o índice da aba
              >
                VOICE
              </core.CNavLink>
            </core.CNavItem>
          )}
          {userrole.includes("admin") || userrole.includes("superAdm")  && (
            <core.CNavItem>
              <core.CNavLink
                href="#!"
                active={activeKey === 4}
                onClick={() => handleClick(4)} // Chame handleClick com o índice da aba
              >
                ADMIN
              </core.CNavLink>
            </core.CNavItem>
          )}
      </core.CNav>
      <core.CTabContent>
        <core.CTabPane
          role="tabpanel"
          aria-labelledby="AUDIT"
          visible={activeKey === 1}
        >
          {/* Passando orgservices e userrole como props para AuditPage */}
          <AuditPage orgservices={orgservices} userrole={userrole} />
          {console.log("AuditPage renderizado")}
        </core.CTabPane>
        <core.CTabPane
            role="tabpanel"
            aria-labelledby="PROVE"
            visible={activeKey === 2}>  
            <Prove orgservices={orgservices} userrole={userrole} /> 
            </core.CTabPane>
          <core.CTabPane
            role="tabpanel"
            aria-labelledby="VOICE"
            visible={activeKey === 3}>
              <Voice orgservices={orgservices} userrole={userrole} />
            </core.CTabPane>
            <core.CTabPane
            role="tabpanel"
            aria-labelledby="ADMIN"
            visible={activeKey === 4}>
              <AdmUser orgservices={orgservices} userrole={userrole} />
            </core.CTabPane>
      </core.CTabContent>
      
    </div>
    </>
  );
};

export default Home;
