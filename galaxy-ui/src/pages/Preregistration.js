import React, { useState } from "react";
import { Container, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Typography, Select, MenuItem } from "@mui/material";

const unregisteredDevices = [
  { id: 1, mac: "AA:BB:CC:DD:EE:11", onboardedBy: "User1", date: "2025-03-25" },
  { id: 2, mac: "AA:BB:CC:DD:EE:22", onboardedBy: "User2", date: "2025-03-26" },
];

const registeredDevices = [
  { id: 3, mac: "AA:BB:CC:DD:EE:33", type: "NDC", registeredBy: "User3", date: "2025-03-20" },
];

const Preregistration = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceType, setDeviceType] = useState("NDC");

  const handleSelect = (id) => {
    setSelectedDevices((prev) =>
      prev.includes(id) ? prev.filter((deviceId) => deviceId !== id) : [...prev, id]
    );
  };

  const handleRegister = () => {
    alert(`Registering devices ${selectedDevices.join(", ")} as ${deviceType}`);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>Pre-Registration</Typography>
      <Paper>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Unregistered Devices" />
          <Tab label="Registered Devices" />
        </Tabs>
      </Paper>

      {selectedTab === 0 ? (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Unregistered Devices</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>MAC Address</TableCell>
                  <TableCell>Onboarded By</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unregisteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>
                      <Checkbox checked={selectedDevices.includes(device.id)} onChange={() => handleSelect(device.id)} />
                    </TableCell>
                    <TableCell>{device.mac}</TableCell>
                    <TableCell>{device.onboardedBy}</TableCell>
                    <TableCell>{device.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} sx={{ mt: 2 }}>
            <MenuItem value="NDC">NDC</MenuItem>
            <MenuItem value="Kiosk">Kiosk</MenuItem>
            <MenuItem value="Multimedia">Multimedia</MenuItem>
            <MenuItem value="Desktop">Desktop</MenuItem>
          </Select>

          <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={handleRegister}>Register</Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Registered Devices</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>MAC Address</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Registered By</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registeredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.mac}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>{device.registeredBy}</TableCell>
                    <TableCell>{device.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Preregistration;
