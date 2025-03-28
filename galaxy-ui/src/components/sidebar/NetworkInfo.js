import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import { fetchNetworkDetails } from "../../services/networkService";
import { setNetworkDetails, setLoading } from "../../store/slice/networkSlice";

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
    <TableContainer component={Paper}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : networkDetails.length === 0 ? (
        <Typography sx={{ p: 2 }}>No network data available.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{row.dnsSuffix}</TableCell>
                <TableCell>{row.fqdn}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.ip}</TableCell>
                <TableCell>{row.mac}</TableCell>
                <TableCell>{row.gateway}</TableCell>
                <TableCell>{row.subnet}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default NetworkInfo;
