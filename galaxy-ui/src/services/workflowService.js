const API_BASE_URL = "http://localhost:8080/api/workflows";

export const fetchWorkflows = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    return await response.json();
};
