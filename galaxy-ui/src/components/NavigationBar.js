import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Tabs
          value={location.pathname}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Node Info" component={NavLink} to="/node-info" value="/node-info" />
          <Tab label="Bulk Action" component={NavLink} to="/bulk-action" value="/bulk-action" />
          <Tab label="Workflow" component={NavLink} to="/workflow" value="/workflow" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
