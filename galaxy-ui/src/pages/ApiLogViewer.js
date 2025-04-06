import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import { fetchApiLog } from "../services/logService";

const ApiLogViewer = () => {
  const { apiLogUrl } = useParams();
  const [apiLog, setApiLog] = useState("");

  useEffect(() => {
    const loadApiLog = async () => {
      try {
        const data = await fetchApiLog(decodeURIComponent(apiLogUrl));
        setApiLog(data);
      } catch (error) {
        console.error("Failed to load API log:", error);
      }
    };
    loadApiLog();
  }, [apiLogUrl]);

  return (
    <Paper sx={{ padding: 3, margin: 3 }}>
      <Typography variant="h5" gutterBottom>
        API Log Details
      </Typography>
      <Box sx={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 2, borderRadius: 2 }}>
        {apiLog || "No API log available"}
      </Box>
    </Paper>
  );
};

export default ApiLogViewer;
