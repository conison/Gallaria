import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Typography, CircularProgress, Box } from "@mui/material";
import { fetchHosts } from "../services/hostService";
import { setHosts, setLoading } from '../store/slice/hostSlice';

// 🌟 Importing colorful icons
import { Computer, Lan, Place, CheckBox } from "@mui/icons-material";

const BulkAction = () => {
  const dispatch = useDispatch();
  const { hosts, loading } = useSelector((state) => state.hosts);
  const [selectedHosts, setSelectedHosts] = useState([]);

  useEffect(() => {
    const loadHosts = async () => {
      dispatch(setLoading(true));
      const fetchedHosts = await fetchHosts();
      dispatch(setHosts(fetchedHosts));
      dispatch(setLoading(false));
    };

    loadHosts();
  }, [dispatch]);

  const handleSelect = (id) => {
    setSelectedHosts((prev) =>
      prev.includes(id) ? prev.filter((hostId) => hostId !== id) : [...prev, id]
    );
  };

  const handleAction = (action) => {
    alert(`Performing '${action}' on selected hosts: ${selectedHosts.join(", ")}`);
  };

  return (
    <Container>
      {/* 🌟 Page Title */}
      <Typography variant="h4" sx={{ my: 2, fontWeight: "bold", color: "#1976d2" }}>
        🚀 Bulk Actions
      </Typography>

      <Paper sx={{ p: 2, boxShadow: 3 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <CheckBox sx={{ color: "#1976d2", marginRight: 1 }} />
                      Select
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Computer sx={{ color: "#ff5722", marginRight: 1 }} />
                      Hostname
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Lan sx={{ color: "#4caf50", marginRight: 1 }} />
                      MAC Address
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Place sx={{ color: "#2196f3", marginRight: 1 }} />
                      Location
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hosts.map((host) => (
                  <TableRow key={host.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedHosts.includes(host.id)}
                        onChange={() => handleSelect(host.id)}
                      />
                    </TableCell>
                    <TableCell>{host.hostname}</TableCell>
                    <TableCell>{host.mac}</TableCell>
                    <TableCell>{host.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* 🌟 Action Buttons */}
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => handleAction("Promote")}>
            📢 Promote
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleAction("Demise")}>
            ⚠️ Demise
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#009688", color: "white" }} onClick={() => handleAction("Check Network Status")}>
            🌐 Network Status
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BulkAction;
