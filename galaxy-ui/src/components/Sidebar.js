import React from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";

const Sidebar = ({ onTabSelect }) => {
  return (
    <Paper sx={{ width: "100%", p: 2 }}>
      <List>
        <ListItem button onClick={() => onTabSelect("network")}>
          <ListItemText primary="Network Info" />
        </ListItem>
        <ListItem button onClick={() => onTabSelect("storage")}>
          <ListItemText primary="Storage Info" />
        </ListItem>
        <ListItem button onClick={() => onTabSelect("system")}>
          <ListItemText primary="System Info" />
        </ListItem>
        <ListItem button onClick={() => onTabSelect("peripheral")}>
          <ListItemText primary="Peripheral Info" />
        </ListItem>
        <ListItem button onClick={() => onTabSelect("services")}>
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button onClick={() => onTabSelect("processes")}>
          <ListItemText primary="Processes" />
        </ListItem>
        <ListItem button onClick={() => onTabSelect("admin")}>
          <ListItemText primary="Admin Actions" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
