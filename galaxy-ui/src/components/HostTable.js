import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHosts } from "../services/hostService";
import { setHosts, setLoading } from "../store/slice/hostSlice";
import { Computer, Lan, Place, CalendarToday, Person, ListAlt } from "@mui/icons-material"; // 🌟 Importing icons

const HostTable = ({ selectedTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Access Redux State
  const { hosts, loading } = useSelector((state) => state.hosts);

  useEffect(() => {
    const loadHosts = async () => {
      dispatch(setLoading(true));
      try {
        const hostData = await fetchHosts();
        dispatch(setHosts(hostData)); // ✅ Correct action
      } catch (error) {
        console.error("Failed to fetch hosts:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadHosts();
  }, [dispatch]);

  return (
    <TableContainer component={Paper} sx={{ marginLeft: 3, padding: 2 }}>

      {/* ✅ Header Section (Node Info & Preregistration) */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        {/* 🌟 Attractive Node Info Text with Icon */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", textTransform: "uppercase", display: "flex", alignItems: "center" }}>
          🖥️ Node Info
        </Typography>

        {/* 🚀 Go to Preregistration Button */}
        {(selectedTab === "NDC" || selectedTab === "Desktop") && (
          <Link
            component="button"
            onClick={() => navigate("/preregistration")}
            sx={{
              textDecoration: "none",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: "bold",
              boxShadow: "0px 3px 5px rgba(0,0,0,0.15)",
              transition: "0.3s",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0px 5px 8px rgba(0,0,0,0.2)",
              },
            }}
          >
            🚀 Go to Preregistration
          </Link>
        )}
      </Box>

      {/* ✅ Main Content */}
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Computer sx={{ color: "#1976d2", marginRight: 1 }} />
                  Hostname
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Lan sx={{ color: "#ff9800", marginRight: 1 }} />
                  MAC Address
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Place sx={{ color: "#4caf50", marginRight: 1 }} />
                  Location
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <CalendarToday sx={{ color: "#9c27b0", marginRight: 1 }} />
                  Registration Date
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Person sx={{ color: "#f44336", marginRight: 1 }} />
                  Registered By
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <ListAlt sx={{ color: "#009688", marginRight: 1 }} />
                  Actions
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hosts.length > 0 ? (
              hosts.map((host) => (
                <TableRow key={host.hostname}>
                  <TableCell>
                    <Button onClick={() => navigate(`/host/${host.hostname}`)}>{host.hostname}</Button>
                  </TableCell>
                  <TableCell>{host.mac}</TableCell>
                  <TableCell>{host.location}</TableCell>
                  <TableCell>{host.regDate}</TableCell>
                  <TableCell>{host.registeredBy}</TableCell>
                  <TableCell>
                    <Button color="primary">PXE Log</Button>
                    <Button color="secondary">Promotion Log</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hosts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default HostTable;
