import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Checkbox, TextField, Autocomplete, Box, Typography,
  Tabs, Tab, FormControl, InputLabel, Select, MenuItem, TableSortLabel
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchHosts } from "../services/hostService";
import { setHosts, setLoading } from "../store/slice/hostSlice";
import {
  Computer, Lan, Place, CalendarToday, Person, ListAlt,
  Dns, DesktopWindows, Storage
} from "@mui/icons-material";

const BulkAction = () => {
  const dispatch = useDispatch();
  const { hosts, loading } = useSelector((state) => state.hosts);
  const [selectedHosts, setSelectedHosts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkActions, setBulkActions] = useState({});
  const [selectedTab, setSelectedTab] = useState("NDC");
  const [actionDropdown, setActionDropdown] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("hostname");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const loadHosts = async () => {
      dispatch(setLoading(true));
      try {
        const hostData = await fetchHosts();
        dispatch(setHosts(hostData));
      } catch (error) {
        console.error("Failed to fetch hosts:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadHosts();
  }, [dispatch]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedHosts = [...hosts].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy].localeCompare(b[orderBy]);
    }
    return b[orderBy].localeCompare(a[orderBy]);
  });

  const filteredHosts = sortedHosts.filter((host) => host.hostname.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedHosts = filteredHosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSelectHost = (hostname) => {
    setSelectedHosts((prev) => ({
      ...prev,
      [hostname]: !prev[hostname],
    }));
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const updatedSelections = {};
    paginatedHosts.forEach((host) => {
      updatedSelections[host.hostname] = checked;
    });
    setSelectedHosts(updatedSelections);
  };

  const handleBulkActionChange = (action) => {
    setActionDropdown(action);
    const updatedActions = { ...bulkActions };
    Object.keys(selectedHosts).forEach((hostname) => {
      if (selectedHosts[hostname]) {
        updatedActions[hostname] = action;
      }
    });
    setBulkActions(updatedActions);
  };

  const handleApplyActions = () => {
    console.log("Applying Bulk Actions:", bulkActions);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ marginLeft: 3, padding: 2 }}>
      <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)}>
        <Tab label={<><Storage sx={{ color: "#ff9800", marginRight: 1 }} /> NDC</>} value="NDC" />
        <Tab label={<><DesktopWindows sx={{ color: "#4caf50", marginRight: 1 }} /> Desktop</>} value="Desktop" />
        <Tab label={<><Dns sx={{ color: "#1976d2", marginRight: 1 }} /> NDS</>} value="NDS" />
        <Tab label={<><Computer sx={{ color: "#9c27b0", marginRight: 1 }} /> Server</>} value="Server" />
      </Tabs>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", display: "flex", alignItems: "center" }}>
          <ListAlt sx={{ marginRight: 1 }} /> Bulk Actions
        </Typography>
        <Box display="flex" alignItems="center">
          <Autocomplete
            freeSolo
            options={hosts.map((host) => host.hostname)}
            onInputChange={(event, newValue) => setSearchTerm(newValue)}
            renderInput={(params) => <TextField {...params} label="Search Host" variant="outlined" />}
            sx={{ width: 300, marginRight: 2 }}
          />
          <TextField
            select
            label="Show"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            size="small"
            sx={{ width: 100 }}
          >
            {[10, 20, 50].map((count) => (
              <MenuItem key={count} value={count}>{count}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "hostname"}
                direction={orderBy === "hostname" ? order : 'asc'}
                onClick={() => handleSort("hostname")}
              >
                <Computer sx={{ color: "#1976d2", marginRight: 1 }} /> Hostname
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "mac"}
                direction={orderBy === "mac" ? order : 'asc'}
                onClick={() => handleSort("mac")}
              >
                <Lan sx={{ color: "#ff9800", marginRight: 1 }} /> MAC Address
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "location"}
                direction={orderBy === "location" ? order : 'asc'}
                onClick={() => handleSort("location")}
              >
                <Place sx={{ color: "#4caf50", marginRight: 1 }} /> Location
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "regDate"}
                direction={orderBy === "regDate" ? order : 'asc'}
                onClick={() => handleSort("regDate")}
              >
                <CalendarToday sx={{ color: "#9c27b0", marginRight: 1 }} /> Registration Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "registeredBy"}
                direction={orderBy === "registeredBy" ? order : 'asc'}
                onClick={() => handleSort("registeredBy")}
              >
                <Person sx={{ color: "#f44336", marginRight: 1 }} /> Registered By
              </TableSortLabel>
            </TableCell>
            <TableCell><ListAlt sx={{ color: "#009688", marginRight: 1 }} /> Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedHosts.map((host) => (
            <TableRow key={host.hostname}>
              <TableCell>
                <Checkbox checked={!!selectedHosts[host.hostname]} onChange={() => handleSelectHost(host.hostname)} />
              </TableCell>
              <TableCell>{host.hostname}</TableCell>
              <TableCell>{host.mac}</TableCell>
              <TableCell>{host.location}</TableCell>
              <TableCell>{host.regDate}</TableCell>
              <TableCell>{host.registeredBy}</TableCell>
              <TableCell>{bulkActions[host.hostname] || "No Action"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="bulk-action-label">Action</InputLabel>
          <Select
            labelId="bulk-action-label"
            value={actionDropdown}
            label="Action"
            onChange={(e) => handleBulkActionChange(e.target.value)}
          >
            <MenuItem value="Promote">Promote</MenuItem>
            <MenuItem value="Demise">Demise</MenuItem>
            <MenuItem value="Ping">Ping</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="success" onClick={handleApplyActions}>Apply Actions</Button>
      </Box>
    </TableContainer>
  );
};

export default BulkAction;
