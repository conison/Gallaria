import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from "@mui/material";
import { fetchServices } from "../../services/serviceService";
import { setServices, toggleServiceStatus, setLoading } from "../../store/slice/serviceSlice";

const ServicesInfo = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.services);

  useEffect(() => {
    const loadServices = async () => {
      dispatch(setLoading(true));
      const fetchedData = await fetchServices();
      dispatch(setServices(fetchedData));
      dispatch(setLoading(false));
    };

    loadServices();
  }, [dispatch]);

  const handleToggleService = (serviceName) => {
    dispatch(toggleServiceStatus(serviceName));
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : services.length === 0 ? (
        <Typography sx={{ p: 2 }}>No services found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Startup Type</TableCell>
              <TableCell>Process ID</TableCell>
              <TableCell>Logon As</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.name}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.status}</TableCell>
                <TableCell>{service.startupType}</TableCell>
                <TableCell>{service.processId}</TableCell>
                <TableCell>{service.logonAs}</TableCell>
                <TableCell>{service.path}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleToggleService(service.name)}
                    variant="contained"
                    color={service.status === "Running" ? "error" : "success"}
                  >
                    {service.status === "Running" ? "Stop" : "Start"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ServicesInfo;
