import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          {row.mobile}
        </TableCell>
        <TableCell align="center">{row.siteid}</TableCell>
        <TableCell align="center">{row.username}</TableCell>
        <TableCell align="center">{row.timestamp}</TableCell>
        <TableCell align="center">{row.act_transactionid}</TableCell>
        <TableCell align="right">{row.trustscore}</TableCell>
        <TableCell align="right">{row.act_status}</TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 3 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Details</h4>
              <Table component={Paper} size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  {Array.isArray(row.details) ? (
                    row.details.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{Object.keys(detail)[0]}</TableCell>
                        <TableCell>{Object.values(detail)[0]}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>Details not available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Number Info</h4>
              <Table
                component={Paper}
                size="small"
                aria-label="number info"
              >
                <TableHead></TableHead>
                <TableBody>
                  {Object.entries(row.numberInfo).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                  {Object.entries(row.numberInfo).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        Number info not available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
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
                  {Array.isArray(row.indicators) ? (
                    row.indicators.map((indicator, index) => (
                      <TableRow key={index}>
                        <TableCell>{indicator}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>{row.indicators || 'Indicators not available'}</TableCell>
                    </TableRow>
                  )}
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
    act_transactionid: PropTypes.string.isRequired,
    siteid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    trustscore: PropTypes.string.isRequired,
    act_status: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    indicators: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    details: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
    numberInfo: PropTypes.shape({
      carrier: PropTypes.string.isRequired,
      lineType: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function CollapsibleTable({ rows, totalLine }) {
  const startIdx = Math.max(0, rows.length - totalLine);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>
              Site Id
            </TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>
              Username
            </TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>
              Timestamp
            </TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold' }}>
              Transaction Id
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              TrustScore
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Request Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(startIdx).map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.array.isRequired,
  totalLine: PropTypes.number.isRequired,
};

const IcnAllTable = ({ totalLine }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://213.163.247.230:3093/event/activity',
          {
            method: 'GET',
            headers: {
              'i-token': 'rvxdviev66at8db8p3av3jkckk50wd',
            },
            referrerPolicy: 'unsafe-url',
          }
        );
        const data = await response.json();
        console.log('Dados recebidos da API:', data); // Adicionando log para verificar os dados recebidos
        setRowData(data.rows || []);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return <CollapsibleTable rows={rowData} totalLine={totalLine} />;
};

IcnAllTable.propTypes = {
  totalLine: PropTypes.number.isRequired,
};

export default IcnAllTable;
