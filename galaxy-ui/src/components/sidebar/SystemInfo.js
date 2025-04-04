import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import TvIcon from "@mui/icons-material/Tv";
import HeadsetIcon from "@mui/icons-material/Headset";

const systemData = [
  { bios: "American Megatrends 2.1", video: "Intel UHD Graphics", audio: "Realtek HD Audio" }
];

const SystemInfo = () => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            <TableCell>BIOS Details</TableCell>
            <TableCell>Video Details</TableCell>
            <TableCell>Audio Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {systemData.map((row, index) => (
            <TableRow key={index}>
              <TableCell><MemoryIcon sx={{ color: "#FF7043" }} /> {row.bios}</TableCell>
              <TableCell><TvIcon sx={{ color: "#1E88E5" }} /> {row.video}</TableCell>
              <TableCell><HeadsetIcon sx={{ color: "#43A047" }} /> {row.audio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SystemInfo;
