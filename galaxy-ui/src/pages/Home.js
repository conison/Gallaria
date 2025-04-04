import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHosts } from '../store/slice/hostSlice';
import HostTable from '../components/HostTable';

// ✅ Import Material-UI components
import { Container, Typography, Paper, Tabs, Tab } from '@mui/material';

// 🌟 Import Icons for Tabs
import { Dns, Computer, Storage, Cloud } from "@mui/icons-material";

const Home = () => {
  const dispatch = useDispatch();
  const hosts = useSelector((state) => state.hosts.hostDetails || []);

  const [selectedTab, setSelectedTab] = useState("NDC");
  const [selectedSidebarTab, setSelectedSidebarTab] = useState(null);

  useEffect(() => {
    dispatch(setHosts());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container sx={{ pt: 2 }}>
      {/* 🌟 Title with Icon */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", color: "#1976d2" }}>
        <Dns sx={{ fontSize: 28, color: "#1976d2", mr: 1 }} /> Node Info
      </Typography>

      {/* 🌟 Updated Tabs with Icons */}
      <Paper sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange} 
          indicatorColor="primary" 
          textColor="primary"
          sx={{ "& .MuiTab-root": { minWidth: "100px" } }} // Adjust tab width for better spacing
        >
          <Tab icon={<Dns sx={{ color: "#ff9800" }} />} label="NDC" value="NDC" />
          <Tab icon={<Computer sx={{ color: "#4caf50" }} />} label="Desktop" value="Desktop" />
          <Tab icon={<Storage sx={{ color: "#f44336" }} />} label="NDS" value="NDS" />
          <Tab icon={<Cloud sx={{ color: "#2196f3" }} />} label="Server" value="Server" />
        </Tabs>
      </Paper>

      {/* 🌟 Host Table */}
      <div style={{ display: 'flex', marginTop: 20 }}>
        <HostTable selectedTab={selectedTab} selectedSidebarTab={selectedSidebarTab} hosts={hosts} />
      </div>
    </Container>
  );
};

export default Home;
