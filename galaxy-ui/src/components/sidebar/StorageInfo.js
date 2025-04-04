import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import UsbIcon from "@mui/icons-material/Usb";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import SaveIcon from "@mui/icons-material/Save";

const storageData = [
  { model: "Samsung SSD", interface: "NVMe", partition: "C:", mediaType: "SSD", size: "512GB" }
];

const iconMap = {
  model: <StorageIcon sx={{ color: "#1E88E5" }} />, 
  interface: <UsbIcon sx={{ color: "#8E24AA" }} />, 
  partition: <SdStorageIcon sx={{ color: "#43A047" }} />, 
  mediaType: <DeviceHubIcon sx={{ color: "#FB8C00" }} />, 
  size: <SaveIcon sx={{ color: "#D81B60" }} />
};

const StorageInfo = () => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
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
              <TableCell>{iconMap.model} {row.model}</TableCell>
              <TableCell>{iconMap.interface} {row.interface}</TableCell>
              <TableCell>{iconMap.partition} {row.partition}</TableCell>
              <TableCell>{iconMap.mediaType} {row.mediaType}</TableCell>
              <TableCell>{iconMap.size} {row.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StorageInfo;
