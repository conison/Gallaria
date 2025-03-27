import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const initialProcesses = [
  { name: "chrome.exe", processId: 4321, memory: "200MB", peakMemory: "500MB", thread: 12, path: "C:\\Program Files\\Google\\Chrome.exe" }
];

const ProcessesInfo = () => {
  const [processes, setProcesses] = useState(initialProcesses);

  const killProcess = (index) => {
    setProcesses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TableContainer component={Paper}>
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
          {processes.map((process, index) => (
            <TableRow key={index}>
              <TableCell>{process.name}</TableCell>
              <TableCell>{process.processId}</TableCell>
              <TableCell>{process.memory}</TableCell>
              <TableCell>{process.peakMemory}</TableCell>
              <TableCell>{process.thread}</TableCell>
              <TableCell>{process.path}</TableCell>
              <TableCell>
                <Button onClick={() => killProcess(index)} variant="contained" color="error">
                  Kill
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProcessesInfo;
