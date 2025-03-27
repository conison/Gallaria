import React, { useState } from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Typography } from "@mui/material";

const hosts = [
  { id: 1, hostname: "host1", mac: "00:1A:2B:3C:4D:5E", location: "NY", checked: false },
  { id: 2, hostname: "host2", mac: "00:1B:2C:3D:4E:5F", location: "SF", checked: false },
  { id: 3, hostname: "host3", mac: "00:1C:2D:3E:4F:5G", location: "LA", checked: false },
];

const BulkAction = () => {
  const [selectedHosts, setSelectedHosts] = useState([]);

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
