import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Autocomplete, Box, Typography, Tabs, Tab, Link,
  MenuItem, Select, FormControl, InputLabel, TableSortLabel, Button,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchHosts } from "../services/hostService";
import { setHosts, setLoading } from "../store/slice/hostSlice";
import {
  Computer, Lan, Place, CalendarToday, Person, Dns,
  DesktopWindows, Storage, Visibility
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HostTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hosts, loading } = useSelector((state) => state.hosts); // <-- make sure `loading` is in slice
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("NDC");
  const [sortColumn, setSortColumn] = useState("hostname");
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchHosts().then((hostData) => {
      dispatch(setHosts(hostData));
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const filteredHosts = hosts
    ?.filter((host) =>
      host?.hostname?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "asc"
        ? (a[sortColumn] || "").localeCompare(b[sortColumn] || "")
        : (b[sortColumn] || "").localeCompare(a[sortColumn] || "");
    }) || [];

  const paginatedHosts = filteredHosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredHosts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress size={60} thickness={5} />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ ml: 3, p: 2 }}>
      {/* Tabs */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Tabs value={selectedTab} onChange={(e, val) => setSelectedTab(val)}>
          <Tab label={<><Storage sx={{ color: "#ff9800", mr: 1 }} /> NDC</>} value="NDC" />
          <Tab label={<><DesktopWindows sx={{ color: "#4caf50", mr: 1 }} /> Desktop</>} value="Desktop" />
          <Tab label={<><Dns sx={{ color: "#1976d2", mr: 1 }} /> NDS</>} value="NDS" />
          <Tab label={<><Computer sx={{ color: "#9c27b0", mr: 1 }} /> Server</>} value="Server" />
        </Tabs>
      </Box>

      {/* Search, Dropdown, and Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Host Information
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Autocomplete
            freeSolo
            options={(hosts || []).map((host) => host.hostname)}
            onInputChange={(e, val) => setSearchTerm(val)}
            renderInput={(params) => (
              <TextField {...params} label="Search Host" variant="outlined" sx={{ width: 300 }} />
            )}
          />
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id="items-per-page-label">Show</InputLabel>
            <Select
              labelId="items-per-page-label"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              label="Show"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>

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
              🚀 Preregister Devices
            </Link>
          )}
        </Box>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            {[
              { key: "hostname", label: "Hostname", icon: <Computer /> },
              { key: "mac", label: "MAC Address", icon: <Lan /> },
              { key: "location", label: "Location", icon: <Place /> },
              { key: "regDate", label: "Registration Date", icon: <CalendarToday /> },
              { key: "registeredBy", label: "Registered By", icon: <Person /> },
            ].map(({ key, label, icon }) => (
              <TableCell key={key}>
                <TableSortLabel active={sortColumn === key} direction={sortOrder} onClick={() => handleSort(key)}>
                  {icon} {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell><Visibility sx={{ color: "#009688", mr: 1 }} /> View Log</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedHosts.map((host) => (
            <TableRow key={host.hostname} sx={{ cursor: "pointer", '&:hover': { backgroundColor: "#e3f2fd" } }}>
              <TableCell>
                <Link onClick={() => navigate(`/host/${host.hostname}`)} sx={{ color: "#1976d2", textDecoration: "none", '&:hover': { textDecoration: "underline" } }}>
                  {host.hostname}
                </Link>
              </TableCell>
              <TableCell>{host.mac}</TableCell>
              <TableCell>{host.location}</TableCell>
              <TableCell>{host.regDate}</TableCell>
              <TableCell>{host.registeredBy}</TableCell>
              <TableCell>
                <Link href={`/logs/pxe/${host.hostname}`} target="_blank" color="primary" sx={{ mr: 1 }}>PXE</Link> |
                <Link href={`/logs/workflow/${host.hostname}`} target="_blank" color="secondary" sx={{ ml: 1 }}>Promotion</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Typography>Page {currentPage} of {Math.ceil(filteredHosts.length / itemsPerPage)}</Typography>
        <Button variant="contained" onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredHosts.length / itemsPerPage)}>Next</Button>
      </Box>
    </TableContainer>
  );
};

export default HostTable;
