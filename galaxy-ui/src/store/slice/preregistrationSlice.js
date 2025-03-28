import { createSlice } from '@reduxjs/toolkit';

const preregistrationSlice = createSlice({
  name: 'preregistration',
  initialState: {
    unregisteredDevices: [],
    registeredDevices: [],
    loading: false
  },
  reducers: {
    setUnregisteredDevices: (state, action) => {
      state.unregisteredDevices = action.payload;
    },
    setRegisteredDevices: (state, action) => {
      state.registeredDevices = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setUnregisteredDevices, setRegisteredDevices, setLoading } = preregistrationSlice.actions;
export default preregistrationSlice.reducer;
