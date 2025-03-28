import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    toggleServiceStatus: (state, action) => {
      const service = state.services.find(service => service.name === action.payload);
      if (service) {
        service.status = service.status === "Running" ? "Stopped" : "Running";
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setServices, toggleServiceStatus, setLoading } = serviceSlice.actions;
export default serviceSlice.reducer;
