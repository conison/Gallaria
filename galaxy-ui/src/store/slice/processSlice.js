import { createSlice } from '@reduxjs/toolkit';

const processSlice = createSlice({
  name: 'processes',
  initialState: {
    processes: [],
    loading: false
  },
  reducers: {
    setProcesses: (state, action) => {
      state.processes = action.payload;
    },
    removeProcess: (state, action) => {
      state.processes = state.processes.filter(process => process.processId !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setProcesses, removeProcess, setLoading } = processSlice.actions;
export default processSlice.reducer;
