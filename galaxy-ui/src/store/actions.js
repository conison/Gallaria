import { fetchHosts, fetchWorkflows } from '../services/hostService';

export const setHosts = () => async (dispatch) => {
    const data = await fetchHosts();
    dispatch({ type: 'SET_HOSTS', payload: data });
};

export const setSelectedHost = (host) => ({
    type: 'SET_SELECTED_HOST',
    payload: host,
});

export const setWorkflows = () => async (dispatch) => {
    const data = await fetchWorkflows();
    dispatch({ type: 'SET_WORKFLOWS', payload: data });
};
