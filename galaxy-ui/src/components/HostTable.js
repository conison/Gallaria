import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHosts } from "../services/hostService";
import { setHosts, setLoading } from "../store/slice/hostSlice";

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
      {/* ✅ Show Preregistration Link for "NDC" & "Desktop" */}
      {(selectedTab === "NDC" || selectedTab === "Desktop") && (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <Link
            component="button"
            variant="h6"
            onClick={() => navigate("/preregistration")}
            sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
          >
            Go to Preregistration
          </Link>
        </Typography>
      )}

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hostname</TableCell>
              <TableCell>MAC Address</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Registered By</TableCell>
              <TableCell>Actions</TableCell>
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
