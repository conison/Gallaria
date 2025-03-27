import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Modal, Box } from "@mui/material";

const workflows = [
  { id: 1, name: "Deploy NDC", status: "Running", details: "Deploying NDC with MECM", logs: "API Logs: Success\nBPMN Graph: Loading..." },
  { id: 2, name: "Promote Host", status: "Completed", details: "Host promoted to production", logs: "API Logs: Success\nWorkflow Completed" },
];

const WorkflowHistory = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const handleClose = () => setSelectedWorkflow(null);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Workflow History</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workflow Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell>{workflow.name}</TableCell>
                <TableCell>{workflow.status}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => setSelectedWorkflow(workflow)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for workflow details */}
      <Modal open={!!selectedWorkflow} onClose={handleClose}>
        <Box sx={{ p: 4, backgroundColor: "white", width: "50%", margin: "auto", mt: 5 }}>
          <Typography variant="h6">{selectedWorkflow?.name}</Typography>
          <Typography variant="body1">{selectedWorkflow?.details}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>{selectedWorkflow?.logs}</Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default WorkflowHistory;
