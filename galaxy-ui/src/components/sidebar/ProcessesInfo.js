import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from "@mui/material";
import { fetchProcesses } from "../../services/processService";
import { setProcesses, removeProcess, setLoading } from "../../store/slice/processSlice";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import RouteIcon from "@mui/icons-material/Route";
import FolderIcon from "@mui/icons-material/Folder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ProcessesInfo = () => {
  const dispatch = useDispatch();
  const { processes, loading } = useSelector((state) => state.processes);

  useEffect(() => {
    const loadProcesses = async () => {
      dispatch(setLoading(true));
      const fetchedData = await fetchProcesses();
      dispatch(setProcesses(fetchedData));
      dispatch(setLoading(false));
    };

    loadProcesses();
  }, [dispatch]);

  const handleKillProcess = (processId) => {
    dispatch(removeProcess(processId));
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : processes.length === 0 ? (
        <Typography sx={{ p: 2 }}>No running processes found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell>Process Name</TableCell>
              <TableCell>Process ID</TableCell>
              <TableCell>Memory</TableCell>
              <TableCell>Peak Memory</TableCell>
              <TableCell>Threads</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process) => (
              <TableRow key={process.processId}>
                <TableCell><DnsIcon sx={{ color: "#1E88E5" }} /> {process.name}</TableCell>
                <TableCell><RouteIcon sx={{ color: "#43A047" }} /> {process.processId}</TableCell>
                <TableCell><MemoryIcon sx={{ color: "#F57C00" }} /> {process.memory}</TableCell>
                <TableCell><StorageIcon sx={{ color: "#8E24AA" }} /> {process.peakMemory}</TableCell>
                <TableCell><MemoryIcon sx={{ color: "#00796B" }} /> {process.thread}</TableCell>
                <TableCell><FolderIcon sx={{ color: "#D32F2F" }} /> {process.path}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleKillProcess(process.processId)} 
                    variant="contained" 
                    color="error" 
                    startIcon={<HighlightOffIcon />}
                  >
                    Kill
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ProcessesInfo;
