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
import ComputerIcon from "@mui/icons-material/Computer";
import StorageIcon from "@mui/icons-material/Storage";
import WifiIcon from "@mui/icons-material/Wifi";
import UsbIcon from "@mui/icons-material/Usb";
import BuildIcon from "@mui/icons-material/Build";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FlagIcon from "@mui/icons-material/Flag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";

const iconMap = {
  name: <AssignmentIndIcon color="primary" />, 
  storage: <StorageIcon color="secondary" />, 
  network: <WifiIcon color="success" />, 
  peripheral: <UsbIcon color="error" />, 
  services: <BuildIcon color="warning" />, 
  processes: <ListAltIcon color="info" />, 
  admin: <AdminPanelSettingsIcon color="primary" />,
  location: <LocationOnIcon color="error" />, 
  region: <PublicIcon color="success" />, 
  address: <HomeIcon color="secondary" />, 
  status: <FlagIcon color="warning" />, 
  datacenter: <BusinessIcon color="info" />, 
  city: <ApartmentIcon color="secondary" />, 
  building: <HomeIcon color="primary" />, 
  country: <PublicIcon color="error" />, 
  owner: <AccountCircleIcon color="primary" />, 
  createdon: <EventIcon color="success" />, 
  createdby: <AccountCircleIcon color="info" />, 
};

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
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <Box sx={{ width: "250px", flexShrink: 0, position: "fixed", height: "100vh", p: 2, backgroundColor: "#e0e0e0" }}>
        <Sidebar onTabSelect={setSelectedTab} />
      </Box>

      <Box sx={{ flexGrow: 1, marginLeft: "260px", p: 3 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : (
          <>
            <Paper elevation={3} sx={{ p: 3, mb: 2, backgroundColor: "#ffffff" }}>
              <Typography variant="h4" gutterBottom>
                Host Details: {hostDetails?.name}
              </Typography>
              <Grid container spacing={2}>
                {hostDetails && Object.entries(hostDetails).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Paper sx={{ p: 2, display: "flex", alignItems: "center", backgroundColor: "#f0f0f0", borderRadius: 2 }}>
                      {iconMap[key.toLowerCase()] || <ComputerIcon color="disabled" />} 
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </Typography>
                        <Typography variant="body1">{value}</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
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
