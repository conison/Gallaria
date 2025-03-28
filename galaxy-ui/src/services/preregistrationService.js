export const fetchUnregisteredDevices = async () => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch("/api/unregisteredDevices");
    // return await response.json();
  
    return [
      { id: 1, mac: "AA:BB:CC:DD:EE:11", onboardedBy: "User1", date: "2025-03-25" },
      { id: 2, mac: "AA:BB:CC:DD:EE:22", onboardedBy: "User2", date: "2025-03-26" }
    ];
  };
  
  export const fetchRegisteredDevices = async () => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch("/api/registeredDevices");
    // return await response.json();
  
    return [
      { id: 3, mac: "AA:BB:CC:DD:EE:33", type: "NDC", registeredBy: "User3", date: "2025-03-20" }
    ];
  };
  
  export const registerDevices = async (deviceIds, deviceType) => {
    // Simulating an API call (Replace later with actual API)
    // await fetch("/api/registerDevices", { method: "POST", body: JSON.stringify({ deviceIds, deviceType }) });
  
    console.log(`Registered devices: ${deviceIds.join(", ")} as ${deviceType}`);
  };
  