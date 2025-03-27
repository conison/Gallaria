import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sampleHosts = [
  { hostname: 'NDC123467', mac: '00:11:22:33:44:55', location: 'Singapore', registeredBy: 'user1', regDate: '2025-03-25' },
  { hostname: 'NDC908540', mac: '00:11:22:33:44:59', location: 'Hong Kong', registeredBy: 'user2', regDate: '2025-03-24' }
];

const HostTable = () => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ marginLeft: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hostname</TableCell>
            <TableCell>MAC Address</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Registered By</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleHosts.map((host) => (
            <TableRow key={host.hostname}>
              <TableCell>
                <Button onClick={() => navigate(`/host/${host.hostname}`)}>{host.hostname}</Button>
              </TableCell>
              <TableCell>{host.mac}</TableCell>
              <TableCell>{host.location}</TableCell>
              <TableCell>{host.regDate}</TableCell>
              <TableCell>{host.registeredBy}</TableCell>
              <TableCell>
                <Button color="primary">PXE Log</Button>
                <Button color="secondary">Promotion Log</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HostTable;
