import React from "react";
import { Button, Stack, Paper, Typography } from "@mui/material";

const AdminActions = () => {
  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6">Admin Actions</Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" color="primary">View Log File</Button>
        <Button variant="contained" color="secondary">Ping</Button>
        <Button variant="contained" color="success">Promote</Button>
        <Button variant="contained" color="error">Demise</Button>
      </Stack>
    </Paper>
  );
};

export default AdminActions;
