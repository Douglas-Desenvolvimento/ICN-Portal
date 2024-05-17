import React, { useState } from "react";
import * as core from "@coreui/react";
import { IMaskMixin } from "react-imask";
import CIcon from "@coreui/icons-react";
import { cilPhone } from "@coreui/icons";
import Paper from "@mui/material/Paper";
import Prove_TrustScore from "./Prove_TrustScore";
import IcnDetailedTable from "../audit_component/icnDetailedTable";
import IcnProveTrustV1Endpoint from "../../hooks/IcdProvePRD/icnProveTrustV1Endpoint";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Prove_TrustScore_Gouge from "./Prove_TrustScore_Gouge";
import IcnAllTable from "../audit_component/icnAllTable";
import { CSSTransition } from 'react-transition-group';
import "../../App.css";

const Prove_InsertPhone = () => {
  const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
    <core.CFormInput {...props} ref={inputRef} />
  ));

  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [dados, setDados] = useState(null);
  const [trustScore, setTrustScore] = useState(0); // Valor inicial pode ser ajustado conforme necessário
  const [showTrustScore, setShowTrustScore] = useState(false);
  const [showFirstTable, setShowFirstTable] = useState(false);
  const [showSecondTable, setShowSecondTable] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !checkBoxChecked) {
      event.stopPropagation();
    } else {
      setShowSpinner(true);
      const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
      console.log("Formatted Phone Number:", formattedPhoneNumber);
      try {
        const response = await IcnProveTrustV1Endpoint(formattedPhoneNumber); // Passando formattedPhoneNumber para a função
        setDados(response);
        setTrustScore(response.response.trustScore); // Atualizando o trustScore no estado
        setShowTrustScore(true);
        setShowFirstTable(true);
        setShowSecondTable(true);
      } catch (error) {
        console.error("Erro ao chamar a API Trust:", error);
      }
      setShowSpinner(false);
    }
    setValidated(true);
    setPhoneNumber("");
  };

  const handlePhoneNumberBlur = (event) => {
    const formattedPhoneNumber = event.target.value.replace(/\D/g, "");
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleCheckBoxChange = (event) => {
    setCheckBoxChecked(event.target.checked);
  };

  return (
    <>
      <div className="justify-content-center p-3">
        <core.CRow >
          <core.CCol sm={10} >
            <div className="d-flex p-1 justify-content-center text-center">
              <Paper elevation={5} className="pt-1" style={{ width: "500px", padding: "3px" }}>
                <core.CRow className=" g-3 p-3">
                  <core.CCard className="mb-auto" style={{ width: "100%" }}>
                    <core.CCardBody>
                      <core.CCardTitle className="text-start">Insert your Phone</core.CCardTitle>
                      <core.CForm
                        className="row row-cols-lg-auto mb-3 g-1 align-items-start"
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <core.CCol md={12}>
                          <core.CInputGroup>
                            <core.CInputGroupText id="addon-wrapping">
                              <CIcon icon={cilPhone} />
                            </core.CInputGroupText>
                            <CFormInputWithMask
                              mask="+55 (00) 00000-0000"
                              type="text"
                              id="validationCustom01"
                              required
                              value={phoneNumber}
                              onBlur={handlePhoneNumberBlur}
                              onChange={() => { }} // Evite mudanças diretas no onChange
                              style={{ width: "80%" }} // Define a largura do input como 100%
                            />
                          </core.CInputGroup>
                        </core.CCol>

                        <core.CCol md={12}>
                          <core.CButton color="secondary" type="submit" disabled={!checkBoxChecked}>
                            {showSpinner ? (
                              <core.CSpinner
                                as="span"
                                size="sm"
                                aria-hidden="true"
                                style={{ marginRight: "5px" }}
                              />
                            ) : (
                              "Check Number"
                            )}
                          </core.CButton>
                        </core.CCol>
                      </core.CForm>
                      <core.CFormCheck
                        className="text-start"
                        type="checkbox"
                        id="invalidCheck"
                        label="Click to authorize the use of data"
                        checked={checkBoxChecked}
                        onChange={handleCheckBoxChange}
                      />
                      <core.CFormFeedback invalid>
                        You need to authorize the use of data.
                      </core.CFormFeedback>
                    </core.CCardBody>
                  </core.CCard>
                </core.CRow>
              </Paper>
            </div>
          </core.CCol>

          <core.CCol sm={1}>
            <CSSTransition in={showTrustScore} timeout={300} classNames="fade" unmountOnExit>
              <div className="d-flex justify-content-center mb-2">
                <Card sx={{ width: "200px", minWidth: 275, boxShadow: "0 3px 5px 2px rgba(92, 92, 192, .3)" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Trust Score
                    </Typography>
                    <Prove_TrustScore_Gouge trustScore={trustScore} />
                  </CardContent>
                </Card>
              </div>
            </CSSTransition>
          </core.CCol>
        </core.CRow>

        <CSSTransition in={showFirstTable} timeout={300} classNames="fade" unmountOnExit>
          <div className="d-flex justify-content-center text-center mb-3">
            <Card sx={{ minWidth: 275, boxShadow: "0 3px 5px 2px rgba(92, 92, 192, .3)" }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Trust Score Result details
                </Typography>
                <Typography>
                  <IcnAllTable totalLine={1} />
                </Typography>
              </CardContent>
            </Card>
          </div>
        </CSSTransition>

        <CSSTransition in={showSecondTable} timeout={300} classNames="fade" unmountOnExit>
          <div className="d-flex justify-content-center text-center">
            <Card sx={{ minWidth: 275, boxShadow: "0 3px 5px 2px rgba(92, 92, 192, .3)" }}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Last 100 results
                </Typography>
                <Typography>
                  <IcnAllTable totalLine={100} />
                </Typography>
              </CardContent>
            </Card>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default Prove_InsertPhone;
