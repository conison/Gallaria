import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import { fetchUnregisteredDevices, fetchRegisteredDevices, registerDevices } from "../services/preregistrationService";
import { setUnregisteredDevices, setRegisteredDevices, setLoading } from "../store/slice/preregistrationSlice";

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
      <Typography variant="h4" sx={{ my: 2 }}>Pre-Registration</Typography>
      <Paper>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Unregistered Devices" />
          <Tab label="Registered Devices" />
        </Tabs>
      </Paper>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : selectedTab === 0 ? (
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
