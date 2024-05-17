import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ApiResponse = () => {
  // JSON da resposta da API
  const apiResponse = {
    status: 0,
    siteid: "0505404",
    loginid: "super",
    requestId: "6af2c685-defc-4ef2-a780-3501a2a2874...",
    response: {
      indicators: ["LS", "ND"],
      troubleshootingId: "954ec607-6994fdd...",
      trustScore: 700,
      callInSession: "true",
      details: [
        {
          riskLevel: "2",
        },
        {
          simTimestamp: "2018-10-19T19:50:15Z",
        },
        {
          callDirection: "MO",
        },
        {
          callDuration: "1452",
        },
      ],
      numberInfo: {
        carrier: "O2",
        countryCode: "GB",
        lineType: "mobile",
      },
    },
  };

  return apiResponse;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset"} }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.phone}
        </TableCell>
        <TableCell align="right">{row.siteid}</TableCell>
        <TableCell align="right">{row.loginid}</TableCell>
        <TableCell align="right">{row.simTimestamp}</TableCell>
        <TableCell align="right">{row.requestId}</TableCell>
        <TableCell align="right">{row.trustScore}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: "#f5f5f5"}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 3 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Details</h4>
              <Table component={Paper} size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details &&
                    row.details.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{Object.keys(detail)[0]}</TableCell>
                        <TableCell>{Object.values(detail)[0]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: "#f5f5f5"}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Number Info</h4>
              <Table component={Paper} size="small" aria-label="number info">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(row.numberInfo).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: "#f5f5f5"}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Indicators</h4>
              <Table component={Paper} size="small" aria-label="indicators">
                <TableHead>
                  <TableRow>
                    <TableCell>Indicator</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.indicators &&
                    row.indicators.map((indicator, index) => (
                      <TableRow key={index}>
                        <TableCell>{indicator}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    simTimestamp: PropTypes.string.isRequired,
    requestId: PropTypes.string.isRequired,
    trustScore: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
    numberInfo: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    loginid: PropTypes.string.isRequired,
    siteid: PropTypes.string.isRequired,
    indicators: PropTypes.array.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export function CollapsibleTable({ formattedPhoneNumber }) {
  const { status = "", loginid = "", siteid = "", requestId = "", response = {} } = ApiResponse();
  const { trustScore = 0, details = [], numberInfo = {}, indicators = [] } = response;

  // Construa as linhas com base nos dados JSON
  const row = {
    status,
    loginid,
    siteid,
    requestId,
    trustScore,
    details: details || [], // Garante que details seja um array
    numberInfo, // Passa o objeto numberInfo diretamente
    indicators, // Passa o array de indicators diretamente
    phone: formattedPhoneNumber, // Preencha com o número de telefone apropriado
    simTimestamp: response.details[1].simTimestamp, // Preencha com a data e hora apropriadas
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "#f5f5f5"}}>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Site Id</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Login</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Transaction Date</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Transaction Id</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>TrustScore</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row key={row.phone} row={row} />
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

// Defina o componente IcnDetailedTable
const IcnDetailedTable = ({ formattedPhoneNumber }) => {
  return <CollapsibleTable formattedPhoneNumber={formattedPhoneNumber}/>;
};

// Exporte o componente IcnDetailedTable
export default IcnDetailedTable;
