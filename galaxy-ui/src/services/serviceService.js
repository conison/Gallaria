export const fetchServices = async () => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch("/api/services");
    // return await response.json();
  
    return [
      { name: "MECM Agent", status: "Running", startupType: "Automatic", processId: 1234, logonAs: "SYSTEM", path: "/usr/bin/mecm" },
      { name: "Database Service", status: "Stopped", startupType: "Manual", processId: null, logonAs: "DBUser", path: "/usr/bin/dbservice" }
    ];
  };
  