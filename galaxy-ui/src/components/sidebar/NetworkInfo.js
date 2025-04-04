import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import WifiIcon from "@mui/icons-material/Wifi";
import DnsIcon from "@mui/icons-material/Dns";
import LanIcon from "@mui/icons-material/Lan";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import RouterIcon from "@mui/icons-material/Router";
import SubnetIcon from "@mui/icons-material/GridOn";
import { fetchNetworkDetails } from "../../services/networkService";
import { setNetworkDetails, setLoading } from "../../store/slice/networkSlice";

const iconMap = {
  dnsSuffix: <LanguageIcon sx={{ color: "#E53935" }} />,
  fqdn: <PublicIcon sx={{ color: "#8E24AA" }} />,
  name: <WifiIcon sx={{ color: "#1E88E5" }} />,
  type: <DnsIcon sx={{ color: "#43A047" }} />,
  ip: <LanIcon sx={{ color: "#FB8C00" }} />,
  mac: <SettingsEthernetIcon sx={{ color: "#3949AB" }} />,
  gateway: <RouterIcon sx={{ color: "#D81B60" }} />,
  subnet: <SubnetIcon sx={{ color: "#039BE5" }} />,
};

const NetworkInfo = () => {
  const dispatch = useDispatch();
  const { networkDetails, loading } = useSelector((state) => state.network);

  useEffect(() => {
    const loadNetworkDetails = async () => {
      dispatch(setLoading(true));
      const fetchedData = await fetchNetworkDetails();
      dispatch(setNetworkDetails(fetchedData));
      dispatch(setLoading(false));
    };

    loadNetworkDetails();
  }, [dispatch]);

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : networkDetails.length === 0 ? (
        <Typography sx={{ p: 2 }}>No network data available.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell>DNS Suffix</TableCell>
              <TableCell>FQDN</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>MAC</TableCell>
              <TableCell>Default Gateway</TableCell>
              <TableCell>Subnet Mask</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {networkDetails.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{iconMap.dnsSuffix} {row.dnsSuffix}</TableCell>
                <TableCell>{iconMap.fqdn} {row.fqdn}</TableCell>
                <TableCell>{iconMap.name} {row.name}</TableCell>
                <TableCell>{iconMap.type} {row.type}</TableCell>
                <TableCell>{iconMap.ip} {row.ip}</TableCell>
                <TableCell>{iconMap.mac} {row.mac}</TableCell>
                <TableCell>{iconMap.gateway} {row.gateway}</TableCell>
                <TableCell>{iconMap.subnet} {row.subnet}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default NetworkInfo;
