import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import HostDetailsPage from "./pages/HostDetailsPage";
import BulkActions from "./pages/BulkActions";
import WorkflowHistory from "./pages/WorkflowHistory";
import Preregistration from "./pages/Preregistration";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <NavigationBar />
        <Box sx={{ display: "flex", flexDirection: "column", mt: 8 }}>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/node-info" replace />} />
              <Route path="/node-info" element={<Home />} />
              <Route path="/bulk-action" element={<BulkActions />} />
              <Route path="/workflow" element={<WorkflowHistory />} />
              <Route path="/host/:hostname" element={<HostDetailsPage />} />
              <Route path="/preregistration" element={<Preregistration />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
