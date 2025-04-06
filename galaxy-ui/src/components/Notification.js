// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Menu,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Box,
  Link as MuiLink
} from '@mui/material';
import { Notifications, Work } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import notificationService from '../services/notificationService';

const Notification = () => {
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    notificationService.fetchLatest().then((data) => {
      setNotifications(data);
      setUnreadCount(data.length); // ✅ Set unread count on first load
    });

    notificationService.connect((newNotification) => {
      setNotifications((prev) => [newNotification, ...prev].slice(0, 5));
      setUnreadCount((count) => count + 1); // ✅ Increment unread count
    });

    return () => {
      notificationService.disconnect();
    };
  }, []);

  const handleNotifClick = (event) => {
    setNotifAnchor(event.currentTarget);
    setUnreadCount(0); // ✅ Mark all as read on open
  };

  const handleClose = () => {
    setNotifAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleNotifClick}>
        <Badge badgeContent={unreadCount} color="primary">
          <Notifications sx={{ color: '#1976d2' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleClose}
        PaperProps={{ elevation: 4 }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Paper sx={{ width: 270 }}>
          <List dense>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText primary="No notifications." />
              </ListItem>
            ) : (
              notifications.map((notif, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => window.open(`/logs/workflow/${notif.id}`, '_blank')}
                >
                  <ListItemIcon>
                    <Work sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={notif.name || 'Unnamed Workflow'}
                    secondary={`Workflow ID: ${notif.id}`}
                  />
                </ListItem>
              ))
            )}
          </List>
          <Divider />
          <Box textAlign="center" p={1}>
            <MuiLink component={Link} to="/workflow" underline="hover" color="primary">
              Show More
            </MuiLink>
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

export default Notification;
