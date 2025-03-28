import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHosts } from '../store/slice/hostSlice'; // ✅ Corrected import path
import HostTable from '../components/HostTable';

// ✅ Import Material-UI components
import { Container, Typography, Paper, Tabs, Tab } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const hosts = useSelector((state) => state.hosts.hostDetails || []); // ✅ Ensure hosts is an array

  // ✅ Define state for selected tab
  const [selectedTab, setSelectedTab] = useState("NDC");
  const [selectedSidebarTab, setSelectedSidebarTab] = useState(null); // If needed

  useEffect(() => {
    dispatch(setHosts());
  }, [dispatch]);

  // ✅ Define tab change handler
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 2 }}>
        Node Info
      </Typography>
      <Paper>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="NDC" value="NDC" />
          <Tab label="Desktop" value="Desktop" />
          <Tab label="NDS" value="NDS" />
          <Tab label="Server" value="Server" />
        </Tabs>
      </Paper>
      <div style={{ display: 'flex', marginTop: 20 }}>
        <HostTable selectedTab={selectedTab} selectedSidebarTab={selectedSidebarTab} hosts={hosts} />
      </div>
    </Container>
  );
};

export default Home;
