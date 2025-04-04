const API_BASE_URL = "http://localhost:8080/api/hosts";

export const fetchHosts = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    return await response.json();
};

export const fetchHostDetails = async (hostname) => {
    const response = await fetch(`${API_BASE_URL}/${hostname}`);
    return await response.json();
};


export const fetchWorkflows = async () => {
    // const response = await fetch('/api/workflows');
    // return await response.json();

    return [
        { id: 1, name: 'Deploy Server', status: 'Running' },
        { id: 2, name: 'Update Config', status: 'Completed' }
    ];
};
