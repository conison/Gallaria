import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Typography, CircularProgress } from "@mui/material";
import { fetchHosts } from "../services/hostService";
import { setHosts, setLoading } from '../store/slice/hostSlice'; // ✅ Use setHosts instead of setHostDetails

const BulkAction = () => {
  const dispatch = useDispatch();
  const { hosts, loading } = useSelector((state) => state.hosts); // ✅ Corrected state key (should match the slice name)
  const [selectedHosts, setSelectedHosts] = useState([]);

  useEffect(() => {
    const loadHosts = async () => {
      dispatch(setLoading(true));
      const fetchedHosts = await fetchHosts(); // ✅ Correct variable name
      dispatch(setHosts(fetchedHosts)); // ✅ Use setHosts, not setHostDetails
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
      <Typography variant="h4" sx={{ my: 2 }}>Bulk Actions</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>Hostname</TableCell>
                  <TableCell>MAC Address</TableCell>
                  <TableCell>Location</TableCell>
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

        <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => handleAction("Promote")}>
          Promote
        </Button>
        <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={() => handleAction("Demise")}>
          Demise
        </Button>
        <Button variant="contained" sx={{ m: 1 }} onClick={() => handleAction("Check Network Status")}>
          Network Status
        </Button>
      </Paper>
    </Container>
  );
};

export default BulkAction;
