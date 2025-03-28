import React from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Tabs value={false}>
                    <Tab label="Node Info" component={Link} to="/" />
                    <Tab label="Bulk Action" component={Link} to="/bulk-action" />
                    <Tab label="Workflow" component={Link} to="/workflow" />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
