// src/components/AdminActionsModal.js
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, Typography } from "@mui/material";

const AdminActionsModal = ({ open, onClose, onSubmit }) => {
  const [action, setAction] = useState("");

  const handleSubmit = () => {
    if (action) {
      onSubmit(action);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Perform Admin Action</DialogTitle>
      <DialogContent>
        <Typography>Select an action:</Typography>
        <Select value={action} onChange={(e) => setAction(e.target.value)} fullWidth>
          <MenuItem value="promote">Promote</MenuItem>
          <MenuItem value="demise">Demise</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminActionsModal;