const API_BASE_URL = "http://localhost:8080/api/preregistration";

export const fetchUnregisteredDevices = async () => {
    const response = await fetch(`${API_BASE_URL}/unregistered`);
    return await response.json();
};

export const fetchRegisteredDevices = async () => {
    const response = await fetch(`${API_BASE_URL}/registered`);
    return await response.json();
};

export const registerDevices = async (deviceIds, deviceType) => {
    await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceIds, deviceType }),
    });
};
