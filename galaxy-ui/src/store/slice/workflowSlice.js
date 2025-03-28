import { createSlice } from '@reduxjs/toolkit';

const workflowSlice = createSlice({
  name: 'workflow',
  initialState: {
    workflows: [],
    loading: false
  },
  reducers: {
    setWorkflows: (state, action) => {
      state.workflows = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setWorkflows, setLoading } = workflowSlice.actions;
export default workflowSlice.reducer;
