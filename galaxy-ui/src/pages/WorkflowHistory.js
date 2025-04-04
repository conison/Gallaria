import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Modal, Box, CircularProgress } from "@mui/material";
import { fetchWorkflows } from "../services/workflowService";
import { setWorkflows, setLoading } from "../store/slice/workflowSlice";

// 🌟 Import Colorful Icons
import { History, CheckCircle, Error, Visibility } from "@mui/icons-material";

const WorkflowHistory = () => {
  const dispatch = useDispatch();
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
    <Paper sx={{ p: 2, boxShadow: 3 }}>
      {/* 🌟 Title with Icon */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", color: "#1976d2" }}>
        <History sx={{ fontSize: 28, color: "#1976d2", mr: 1 }} /> Workflow History
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold", color: "#000" }}>Workflow Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold", color: "#000" }}>Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold", color: "#000" }}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <History sx={{ color: "#ff9800", mr: 1 }} /> {workflow.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {workflow.status === "Completed" ? (
                      <Typography sx={{ display: "flex", alignItems: "center", color: "#4caf50" }}>
                        <CheckCircle sx={{ color: "#4caf50", mr: 1 }} /> Completed
                      </Typography>
                    ) : (
                      <Typography sx={{ display: "flex", alignItems: "center", color: "#f44336" }}>
                        <Error sx={{ color: "#f44336", mr: 1 }} /> Pending
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={<Visibility />} 
                      onClick={() => setSelectedWorkflow(workflow)}
                    >
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
        <Box sx={{ p: 4, backgroundColor: "white", width: "50%", margin: "auto", mt: 5, boxShadow: 3 }}>
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
