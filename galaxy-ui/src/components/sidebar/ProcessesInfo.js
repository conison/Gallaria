import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from "@mui/material";
import { fetchProcesses } from "../../services/processService";
import { setProcesses, removeProcess, setLoading } from "../../store/slice/processSlice";

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
    <TableContainer component={Paper}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : processes.length === 0 ? (
        <Typography sx={{ p: 2 }}>No running processes found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Process ID</TableCell>
              <TableCell>Memory</TableCell>
              <TableCell>Peak Memory</TableCell>
              <TableCell>Thread</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process) => (
              <TableRow key={process.processId}>
                <TableCell>{process.name}</TableCell>
                <TableCell>{process.processId}</TableCell>
                <TableCell>{process.memory}</TableCell>
                <TableCell>{process.peakMemory}</TableCell>
                <TableCell>{process.thread}</TableCell>
                <TableCell>{process.path}</TableCell>
                <TableCell>
                  <Button onClick={() => handleKillProcess(process.processId)} variant="contained" color="error">
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
