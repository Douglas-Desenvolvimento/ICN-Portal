import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CButton,
  CAvatar,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import imgs from "../assets/logo.png";
import avatar from "../assets/avatar.jpg";
import CIcon from "@coreui/icons-react";
import { cilAccountLogout } from "@coreui/icons";
import useAuthentication from "../hooks/useAuthentication.jsx";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { getLoggedInUser, logout } = useAuthentication();
  const usuario = getLoggedInUser();
  const navigate = useNavigate(); 
  const navbarRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width > 800) {
          navbarRef.current.style.width = `${width}px`;
        } else {
          navbarRef.current.style.width = "900px";
        }
      }
    });

    observer.observe(navbarRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLogout = () => {
    logout(); 
    setModalVisible(false); 
    navigate("/"); 
  };

  return (
    <CNavbar className="bg-body-tertiary" ref={navbarRef}>
      <CContainer fluid>
        <img src={imgs} alt="" width="182" height="64" />
        <CNavbarBrand>ICN PORTAL</CNavbarBrand>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CAvatar
            size="md"
            src={avatar}
            className="avatar-img"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={() => setVisible(!visible)}
          />
          <CButton
            color="link"
            onClick={() => setModalVisible(!modalVisible)}
            style={{ marginLeft: "10px" }} 
          >
            <CIcon icon={cilAccountLogout} size="xl" title="Logout" />
          </CButton>
        </div>
        <CModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalBody onClose={() => setModalVisible(false)}>
            <p>Deseja Sair?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Não!
            </CButton>
            <CButton color="success" onClick={handleLogout}>
              Sim!
            </CButton>
          </CModalFooter>
        </CModal>

        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>MENU</COffcanvasTitle>
            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#">Perfil</CNavLink>
                <CAvatar size="md" src={avatar} className="avatar-img" />
                <CListGroup flush>
                  <CListGroupItem>
                    Nome: {usuario ? usuario.username : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    E-mail: {usuario ? usuario.email : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Telefone: {usuario ? usuario.mobile : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Empresa: {usuario ? usuario.orgname : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Site-id: {usuario ? usuario.siteid : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Perfil de acesso:{" "}
                    {usuario ? usuario.role : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Serviços:{" "}
                    {usuario ? usuario.services : "Não disponível"}
                  </CListGroupItem>
                </CListGroup>
              </CNavItem>
              <CNavItem></CNavItem>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
};

export default NavBar;
