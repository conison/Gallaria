// src/components/NavigationBar.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dns,
  ListAlt,
  AccountTree,
  ExitToApp,
  Settings,
  Favorite,
  Map,
  Person
} from '@mui/icons-material';
import Notification from './Notification'; // Realtime notification bell

const NavigationBar = () => {
  const [userAnchor, setUserAnchor] = useState(null);
  const openUser = Boolean(userAnchor);

  const handleUserClick = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setUserAnchor(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tabs value={false} textColor="primary" indicatorColor="primary">
          <Tab icon={<Dns sx={{ color: "#1976d2" }} />} label="Node Info" component={Link} to="/" />
          <Tab icon={<ListAlt sx={{ color: "#ff9800" }} />} label="Bulk Action" component={Link} to="/bulk-action" />
          <Tab icon={<AccountTree sx={{ color: "#4caf50" }} />} label="Workflow" component={Link} to="/workflow" />
        </Tabs>

        <Box display="flex" alignItems="center">
          <Notification />

          <IconButton onClick={handleUserClick}>
            <Avatar sx={{ bgcolor: '#1976d2' }}><Person /></Avatar>
          </IconButton>
          <Menu
            anchorEl={userAnchor}
            open={openUser}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon><ExitToApp sx={{ color: '#ef5350' }} /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Settings sx={{ color: '#42a5f5' }} /></ListItemIcon>
              <ListItemText>Preferences</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Favorite sx={{ color: '#ffb74d' }} /></ListItemIcon>
              <ListItemText>Favourites</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Map sx={{ color: '#66bb6a' }} /></ListItemIcon>
              <ListItemText>Mapped Hosts</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
