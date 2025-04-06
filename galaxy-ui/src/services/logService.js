const BASE_URL = "http://localhost:8080/api/logs"; // Update this if needed

export const fetchPXELog = async (hostname) => {
  try {
    const response = await fetch(`${BASE_URL}/pxe/${hostname}`);
    if (!response.ok) throw new Error("Failed to fetch PXE Log");
    
    const data = await response.json();
    return data.logEntries.join("\n"); // Convert array to formatted log text
  } catch (error) {
    console.error("Error fetching PXE Log:", error);
    return "Failed to load PXE log.";
  }
};


export const fetchApiLog = async (processInstanceId, traceId) => {
  try {
    const apiUrl = `${BASE_URL}/${processInstanceId}/${traceId}`
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch API Log");

    const data = await response.json();
    return data.logEntries.join("\n"); // Convert array to formatted log text
  } catch (error) {
    console.error("Error fetching API Log:", error);
    return "Failed to load API log.";
  }
};
