import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Paper } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import WifiIcon from "@mui/icons-material/Wifi";
import ComputerIcon from "@mui/icons-material/Computer";
import UsbIcon from "@mui/icons-material/Usb";
import BuildIcon from "@mui/icons-material/Build";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const icons = {
  network: <WifiIcon sx={{ color: "#E53935" }} />,
  storage: <StorageIcon sx={{ color: "#8E24AA" }} />,
  system: <ComputerIcon sx={{ color: "#1E88E5" }} />,
  peripheral: <UsbIcon sx={{ color: "#43A047" }} />,
  services: <BuildIcon sx={{ color: "#FB8C00" }} />,
  processes: <ListAltIcon sx={{ color: "#3949AB" }} />,
  admin: <AdminPanelSettingsIcon sx={{ color: "#D81B60" }} />,
};

const Sidebar = ({ onTabSelect }) => {
  return (
    <Paper
      sx={{
        width: "100%",
        p: 2,
        backgroundColor: "#e0e0e0",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <List>
        {Object.keys(icons).map((key) => (
          <ListItem
            button
            key={key}
            onClick={() => onTabSelect(key)}
            sx={{
              backgroundColor: "#f5f5f5",
              mb: 1,
              borderRadius: 1,
              transition: "0.3s",
              '&:hover': { backgroundColor: "#dcdcdc" },
            }}
          >
            <ListItemIcon>{icons[key]}</ListItemIcon>
            <ListItemText primary={key.replace(/^./, (str) => str.toUpperCase()) + " Info"} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;
