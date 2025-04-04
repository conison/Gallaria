import React from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

// 🌟 Import Icons
import { Dns, ListAlt, AccountTree } from '@mui/icons-material';

const NavigationBar = () => {
    return (
        <AppBar 
            position="static" 
            sx={{ 
                background: "linear-gradient(135deg, #f7f7f7 30%, #e3eaf1 90%)", // Light & classy 🎨
                boxShadow: 2,
                padding: "5px 0"
            }}
        >
            <Toolbar>
                <Tabs value={false} textColor="inherit" indicatorColor="primary">
                    <Tab 
                        icon={<Dns sx={{ color: "#2980b9", fontSize: 24 }} />} 
                        label="Node Info" 
                        component={Link} 
                        to="/" 
                        sx={{ color: "#2c3e50", fontWeight: "bold" }} 
                    />
                    <Tab 
                        icon={<ListAlt sx={{ color: "#e67e22", fontSize: 24 }} />} 
                        label="Bulk Action" 
                        component={Link} 
                        to="/bulk-action" 
                        sx={{ color: "#2c3e50", fontWeight: "bold" }} 
                    />
                    <Tab 
                        icon={<AccountTree sx={{ color: "#27ae60", fontSize: 24 }} />}  
                        label="Workflow" 
                        component={Link} 
                        to="/workflow" 
                        sx={{ color: "#2c3e50", fontWeight: "bold" }} 
                    />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
