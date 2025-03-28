import { configureStore } from "@reduxjs/toolkit";
import workflowReducer from "./slice/workflowSlice";  // ✅ Ensure it's imported
import hostReducer from './slice/hostSlice'; // ✅ Ensure correct import
import networkReducer from './slice/networkSlice';  // ✅ Import networkSlice
import serviceReducer from './slice/serviceSlice'; 
import processReducer from './slice/processSlice';
import preregistrationReducer from './slice/preregistrationSlice';



const store = configureStore({
  reducer: {
    hosts: hostReducer,
    network: networkReducer, // ✅ Ensure this matches `networkSlice.js`
    services: serviceReducer,
    processes: processReducer,
    preregistration: preregistrationReducer,
    workflows: workflowReducer, // ✅ Ensure workflows is correctly assigned
  },
});

export default store;
