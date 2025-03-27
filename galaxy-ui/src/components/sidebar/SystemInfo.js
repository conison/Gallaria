import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const systemData = [
  { bios: "American Megatrends 2.1", video: "Intel UHD Graphics", audio: "Realtek HD Audio" }
];

const SystemInfo = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>BIOS Details</TableCell>
            <TableCell>Video Details</TableCell>
            <TableCell>Audio Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {systemData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.bios}</TableCell>
              <TableCell>{row.video}</TableCell>
              <TableCell>{row.audio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SystemInfo;
