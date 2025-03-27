import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const peripheralData = [
  { deviceName: "Dell Monitor", resolution: "1920x1080", display: "Primary" }
];

const PeripheralInfo = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell>Resolution</TableCell>
            <TableCell>Display</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {peripheralData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.deviceName}</TableCell>
              <TableCell>{row.resolution}</TableCell>
              <TableCell>{row.display}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PeripheralInfo;
