import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

const peripheralData = [
  { deviceName: "Dell Monitor", resolution: "1920x1080", display: "Primary" }
];

const iconMap = {
  deviceName: <MonitorIcon sx={{ color: "#1E88E5" }} />,
  resolution: <AspectRatioIcon sx={{ color: "#8E24AA" }} />,
  display: <ViewQuiltIcon sx={{ color: "#43A047" }} />
};

const PeripheralInfo = () => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            <TableCell>Device Name</TableCell>
            <TableCell>Resolution</TableCell>
            <TableCell>Display</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {peripheralData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{iconMap.deviceName} {row.deviceName}</TableCell>
              <TableCell>{iconMap.resolution} {row.resolution}</TableCell>
              <TableCell>{iconMap.display} {row.display}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PeripheralInfo;
