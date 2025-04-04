const API_BASE_URL = "http://localhost:8080/api/network";

export const fetchNetworkDetails = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    return await response.json();
};
