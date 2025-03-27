import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const storageData = [
  { model: "Samsung SSD", interface: "NVMe", partition: "C:", mediaType: "SSD", size: "512GB" }
];

const StorageInfo = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>Interface</TableCell>
            <TableCell>Partition</TableCell>
            <TableCell>Media Type</TableCell>
            <TableCell>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storageData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.interface}</TableCell>
              <TableCell>{row.partition}</TableCell>
              <TableCell>{row.mediaType}</TableCell>
              <TableCell>{row.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StorageInfo;
