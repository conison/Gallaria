import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Typography, Select, MenuItem, CircularProgress, Box } from "@mui/material";
import { fetchUnregisteredDevices, fetchRegisteredDevices, registerDevices } from "../services/preregistrationService";
import { setUnregisteredDevices, setRegisteredDevices, setLoading } from "../store/slice/preregistrationSlice";

// 🌟 Importing Colorful Icons
import { Lan, Person, CalendarToday, CheckBox, Devices, DoneAll } from "@mui/icons-material";

const Preregistration = () => {
  const dispatch = useDispatch();
  const { unregisteredDevices, registeredDevices, loading } = useSelector((state) => state.preregistration);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceType, setDeviceType] = useState("NDC");

  useEffect(() => {
    const loadDevices = async () => {
      dispatch(setLoading(true));
      const unregistered = await fetchUnregisteredDevices();
      const registered = await fetchRegisteredDevices();
      dispatch(setUnregisteredDevices(unregistered));
      dispatch(setRegisteredDevices(registered));
      dispatch(setLoading(false));
    };

    loadDevices();
  }, [dispatch]);

  const handleSelect = (id) => {
    setSelectedDevices((prev) =>
      prev.includes(id) ? prev.filter((deviceId) => deviceId !== id) : [...prev, id]
    );
  };

  const handleRegister = async () => {
    await registerDevices(selectedDevices, deviceType);
    alert(`Registered devices ${selectedDevices.join(", ")} as ${deviceType}`);
    setSelectedDevices([]);
  };

  return (
    <Container>
      {/* 🌟 Smaller & Left-Aligned Page Title */}
      <Typography variant="h5" sx={{ my: 2, fontWeight: "bold", color: "#1976d2", textAlign: "left" }}>
        📝 Pre-Registration
      </Typography>

      {/* ✅ Horizontal Tabs - Aligned Left */}
      <Paper sx={{ boxShadow: 3 }}>
        <Tabs 
          value={selectedTab} 
          onChange={(e, newValue) => setSelectedTab(newValue)}
          indicatorColor="primary" 
          textColor="primary"
          sx={{ textAlign: "left", pl: 2 }} // ✅ Left Align Tabs
        >
          <Tab label="🔄 Unregistered Devices" />
          <Tab label="✅ Registered Devices" />
        </Tabs>
      </Paper>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : selectedTab === 0 ? (
        <Paper sx={{ p: 2, mt: 2, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", color: "#ff9800", textAlign: "left" }}>
            <Devices sx={{ marginRight: 1 }} /> Unregistered Devices
          </Typography>

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
                      <Lan sx={{ color: "#4caf50", marginRight: 1 }} />
                      MAC Address
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Person sx={{ color: "#f44336", marginRight: 1 }} />
                      Onboarded By
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <CalendarToday sx={{ color: "#ff5722", marginRight: 1 }} />
                      Date
                    </Box>
                  </TableCell>
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

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} sx={{ mr: 2 }}>
              <MenuItem value="NDC">🏢 NDC</MenuItem>
              <MenuItem value="Kiosk">🖥️ Kiosk</MenuItem>
              <MenuItem value="Multimedia">🎥 Multimedia</MenuItem>
              <MenuItem value="Desktop">💻 Desktop</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={handleRegister}>
              🚀 Register
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ p: 2, mt: 2, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", color: "#4caf50", textAlign: "left" }}>
            <DoneAll sx={{ marginRight: 1 }} /> Registered Devices
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Lan sx={{ color: "#4caf50", marginRight: 1 }} />
                      MAC Address
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Devices sx={{ color: "#9c27b0", marginRight: 1 }} />
                      Type
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Person sx={{ color: "#f44336", marginRight: 1 }} />
                      Registered By
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <CalendarToday sx={{ color: "#ff5722", marginRight: 1 }} />
                      Date
                    </Box>
                  </TableCell>
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
