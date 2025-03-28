import { createSlice } from '@reduxjs/toolkit';

const hostSlice = createSlice({
  name: 'hosts', // ✅ Ensure slice name is 'hosts'
  initialState: {
    hosts: [], // Stores a list of hosts
    hostDetails: null, // Stores details of a selected host
    loading: false,
  },
  reducers: {
    setHosts: (state, action) => {
      console.log("🔥 Redux Action Triggered: setHosts", action.payload); // Debugging
      state.hosts = action.payload;
    },
    setHostDetails: (state, action) => {
      state.hostDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// ✅ Correctly export Redux actions
export const { setHosts, setHostDetails, setLoading } = hostSlice.actions;
export default hostSlice.reducer;
