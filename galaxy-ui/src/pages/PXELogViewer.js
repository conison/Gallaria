import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import { fetchPXELog } from "../services/logService";

const PXELogViewer = () => {
  const { hostname } = useParams();
  const [logData, setLogData] = useState("");

  useEffect(() => {
    fetchPXELog(hostname).then(setLogData);
  }, [hostname]);

  return (
    <Paper sx={{ padding: 3, margin: 3, whiteSpace: "pre-wrap" }}>
      <Typography variant="h5" gutterBottom>
        PXE Log for {hostname}
      </Typography>
      <Box sx={{ backgroundColor: "#f4f4f4", padding: 2, borderRadius: 2 }}>
        <Typography variant="body1">{logData}</Typography>
      </Box>
    </Paper>
  );
};

export default PXELogViewer;
