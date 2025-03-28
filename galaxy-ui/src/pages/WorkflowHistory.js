import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Modal, Box, CircularProgress } from "@mui/material";
import { fetchWorkflows } from "../services/workflowService";
import { setWorkflows, setLoading } from "../store/slice/workflowSlice";

const WorkflowHistory = () => {
  const dispatch = useDispatch();
  
  // ✅ Ensure default values are set
  const { workflows = [], loading = false } = useSelector((state) => state.workflows || {});
  
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  useEffect(() => {
    const loadWorkflows = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedWorkflows = await fetchWorkflows();
        dispatch(setWorkflows(fetchedWorkflows));
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
      dispatch(setLoading(false));
    };

    loadWorkflows();
  }, [dispatch]);

  const handleClose = () => setSelectedWorkflow(null);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Workflow History</Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
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
                    <Button variant="contained" onClick={() => setSelectedWorkflow(workflow)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
