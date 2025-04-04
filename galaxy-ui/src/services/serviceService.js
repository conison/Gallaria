const API_BASE_URL = "http://localhost:8080/api/services";

export const fetchServices = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    return await response.json();
};
