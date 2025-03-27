import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, Typography } from '@mui/material';
import HostTable from '../components/HostTable';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState('NDC');
  const [selectedSidebarTab, setSelectedSidebarTab] = useState('Network');

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
        <HostTable selectedTab={selectedTab} selectedSidebarTab={selectedSidebarTab} />
      </div>
    </Container>
  );
};

export default Home;
