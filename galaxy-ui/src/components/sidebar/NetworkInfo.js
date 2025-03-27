import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const networkData = [
  { dnsSuffix: "example.com", fqdn: "host1.example.com", name: "eth0", type: "Ethernet", ip: "192.168.1.10", mac: "AA:BB:CC:DD:EE:FF", gateway: "192.168.1.1", subnet: "255.255.255.0" }
];

const NetworkInfo = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNS Suffix</TableCell>
            <TableCell>FQDN</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>IP</TableCell>
            <TableCell>MAC</TableCell>
            <TableCell>Default Gateway</TableCell>
            <TableCell>Subnet Mask</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {networkData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.dnsSuffix}</TableCell>
              <TableCell>{row.fqdn}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.ip}</TableCell>
              <TableCell>{row.mac}</TableCell>
              <TableCell>{row.gateway}</TableCell>
              <TableCell>{row.subnet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NetworkInfo;
