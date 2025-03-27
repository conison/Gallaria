import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const initialServices = [
  { name: "MECM Agent", status: "Running", startupType: "Automatic", processId: 1234, logonAs: "SYSTEM", path: "/usr/bin/mecm" }
];

const ServicesInfo = () => {
  const [services, setServices] = useState(initialServices);

  const toggleService = (index) => {
    setServices((prev) =>
      prev.map((service, i) =>
        i === index ? { ...service, status: service.status === "Running" ? "Stopped" : "Running" } : service
      )
    );
  };

  return (
    <TableContainer component={Paper}>
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
          {services.map((service, index) => (
            <TableRow key={index}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.status}</TableCell>
              <TableCell>{service.startupType}</TableCell>
              <TableCell>{service.processId}</TableCell>
              <TableCell>{service.logonAs}</TableCell>
              <TableCell>{service.path}</TableCell>
              <TableCell>
                <Button onClick={() => toggleService(index)} variant="contained" color={service.status === "Running" ? "error" : "success"}>
                  {service.status === "Running" ? "Stop" : "Start"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicesInfo;
