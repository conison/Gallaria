import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostDetails } from "../services/hostService";
import { setHostDetails, setLoading } from "../store/slice/hostSlice";
import Sidebar from "../components/Sidebar";
import NetworkInfo from "../components/sidebar/NetworkInfo";
import StorageInfo from "../components/sidebar/StorageInfo";
import SystemInfo from "../components/sidebar/SystemInfo";
import PeripheralInfo from "../components/sidebar/PeripheralInfo";
import ServicesInfo from "../components/sidebar/ServicesInfo";
import ProcessesInfo from "../components/sidebar/ProcessesInfo";
import AdminActions from "../components/sidebar/AdminActions";

function HostDetailsPage() {
  const { hostname } = useParams();
  const dispatch = useDispatch();
  const { hostDetails, loading } = useSelector((state) => state.hosts);
  const [selectedTab, setSelectedTab] = React.useState("network");

  useEffect(() => {
    const loadHostDetails = async () => {
      dispatch(setLoading(true));
      const details = await fetchHostDetails(hostname);
      dispatch(setHostDetails(details));
      dispatch(setLoading(false));
    };
    
    loadHostDetails();
  }, [dispatch, hostname]);

  // Function to render selected sidebar component
  const renderSidebarContent = () => {
    switch (selectedTab) {
      case "network":
        return <NetworkInfo />;
      case "storage":
        return <StorageInfo />;
      case "system":
        return <SystemInfo />;
      case "peripheral":
        return <PeripheralInfo />;
      case "services":
        return <ServicesInfo />;
      case "processes":
        return <ProcessesInfo />;
      case "admin":
        return <AdminActions />;
      default:
        return <Typography>Select an option from the sidebar</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar at extreme left */}
      <Box sx={{ width: "250px", flexShrink: 0, position: "fixed", height: "100vh", backgroundColor: "#f4f4f4", p: 2 }}>
        <Sidebar onTabSelect={setSelectedTab} />
      </Box>

      {/* Content area for Host Details and Sidebar Info */}
      <Box sx={{ flexGrow: 1, marginLeft: "260px", p: 3 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : (
          <>
            {/* Host Details (Always Visible) */}
            <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                Host Details: {hostDetails?.name}
              </Typography>
              <Grid container spacing={2}>
                {hostDetails != null && Object.entries(hostDetails).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Sidebar Info Content (Changes Dynamically) */}
            <Paper elevation={3} sx={{ p: 3 }}>
              {renderSidebarContent()}
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}

export default HostDetailsPage;
