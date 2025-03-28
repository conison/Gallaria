import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    networkDetails: [],
    loading: false
  },
  reducers: {
    setNetworkDetails: (state, action) => {
      state.networkDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setNetworkDetails, setLoading } = networkSlice.actions;
export default networkSlice.reducer;
