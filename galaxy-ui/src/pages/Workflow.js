import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Box, CircularProgress, MenuItem, Select,
  FormControl, InputLabel, TableSortLabel, TextField, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import {
  History, CheckCircle, Error, Visibility, PauseCircle, PlayArrow,
  RestartAlt, Stop, Cancel
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkflows, pauseWorkflow, resumeWorkflow, retryWorkflow, stopWorkflow, killWorkflow } from "../services/workflowService";
import { setWorkflows, setLoading } from "../store/slice/workflowSlice";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

const Workflow = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { workflows = [] } = useSelector((state) => state.workflows || {});

  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dialog, setDialog] = useState({ open: false, type: "", workflow: null });

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

  useEffect(() => {
    let filteredData = [...workflows];

    if (startDate && endDate) {
      filteredData = filteredData.filter(workflow => {
        const workflowDate = dayjs(workflow.timestamp);
        return workflowDate.isAfter(startDate) && workflowDate.isBefore(endDate);
      });
    }

    filteredData.sort((a, b) => {
      if (sortOrder === "asc") return a[sortColumn]?.localeCompare(b[sortColumn]);
      return b[sortColumn]?.localeCompare(a[sortColumn]);
    });

    setFilteredWorkflows(filteredData);
  }, [workflows, sortColumn, sortOrder, startDate, endDate]);

  const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
  const paginatedWorkflows = filteredWorkflows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (column) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleAction = async (workflowId, actionType) => {
    try {
      let actionFn;
      switch (actionType) {
        case "pause": actionFn = pauseWorkflow; break;
        case "resume": actionFn = resumeWorkflow; break;
        case "retry": actionFn = retryWorkflow; break;
        case "stop": actionFn = stopWorkflow; break;
        case "kill": actionFn = killWorkflow; break;
        default: return;
      }
      await actionFn(workflowId);
      enqueueSnackbar(`Workflow ${actionType}d successfully`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`Failed to ${actionType} workflow`, { variant: "error" });
    }
    setDialog({ open: false, type: "", workflow: null });
  };

  return (
    <Paper sx={{ p: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", color: "#1976d2" }}>
        <History sx={{ fontSize: 28, color: "#1976d2", mr: 1 }} /> Workflow
      </Typography>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box display="flex" alignItems="center">
          <Typography sx={{ mr: 2 }}>Show</Typography>
          <FormControl sx={{ minWidth: 150 }}>
            <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
              {[10, 20, 50, 100].map(size => <MenuItem key={size} value={size}>{size}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" gap={2}>
            <DateTimePicker label="Start Date & Time" value={startDate} onChange={setStartDate} renderInput={(params) => <TextField {...params} fullWidth />} />
            <DateTimePicker label="End Date & Time" value={endDate} onChange={setEndDate} renderInput={(params) => <TextField {...params} fullWidth />} />
          </Box>
        </LocalizationProvider>
      </Box>

      {/* Table */}
      {workflows.length === 0 ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel active={sortColumn === "name"} direction={sortOrder} onClick={() => handleSort("name")}>
                    Workflow Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={sortColumn === "status"} direction={sortOrder} onClick={() => handleSort("status")}>
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkflows.map((workflow) => (
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
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      <Button onClick={() => window.open(`/logs/workflow/${workflow.id}`, "_blank")} startIcon={<Visibility />} color="primary" variant="outlined" size="small">View</Button>
                      <Button onClick={() => handleAction(workflow.id, "pause")} startIcon={<PauseCircle />} color="warning" variant="outlined" size="small">Pause</Button>
                      <Button onClick={() => handleAction(workflow.id, "resume")} startIcon={<PlayArrow />} color="success" variant="outlined" size="small">Resume</Button>
                      <Button onClick={() => handleAction(workflow.id, "retry")} startIcon={<RestartAlt />} color="info" variant="outlined" size="small">Retry</Button>
                      <Button onClick={() => setDialog({ open: true, type: "stop", workflow })} startIcon={<Stop />} color="error" variant="outlined" size="small">Stop</Button>
                      <Button onClick={() => setDialog({ open: true, type: "kill", workflow })} startIcon={<Cancel />} color="error" variant="outlined" size="small">Kill</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</Button>
        <Typography sx={{ mx: 2 }}>Page {currentPage} of {totalPages}</Typography>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, type: "", workflow: null })}>
        <DialogTitle>Confirm {dialog.type?.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to <strong>{dialog.type}</strong> workflow <strong>{dialog.workflow?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, type: "", workflow: null })}>Cancel</Button>
          <Button color="error" onClick={() => handleAction(dialog.workflow.id, dialog.type)}>Yes, {dialog.type}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Workflow;
