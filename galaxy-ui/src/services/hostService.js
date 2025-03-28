export const fetchHosts = async () => {
    // Simulating an API call (Replace later with actual API)
    return [
      { hostname: 'NDC123467', mac: '00:11:22:33:44:55', location: 'Singapore', registeredBy: 'user1', regDate: '2025-03-25' },
      { hostname: 'NDC908540', mac: '00:11:22:33:44:59', location: 'Hong Kong', registeredBy: 'user2', regDate: '2025-03-24' }
    ];
};

  export const fetchHostDetails = async (hostname) => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch(`/api/hosts/${hostname}`);
    // return await response.json();
  
    return {
      name: hostname,
      status: "Active",
      location: "Building A, Floor 5",
      region: "North America",
      datacenter: "DC1",
      city: "New York",
      building: "Alpha Tower",
      country: "USA",
      owner: "John Doe",
      createdBy: "Admin",
      createdOn: "2025-03-27",
    };
  };
  
  

export const fetchWorkflows = async () => {
    // const response = await fetch('/api/workflows');
    // return await response.json();

    return [
        { id: 1, name: 'Deploy Server', status: 'Running' },
        { id: 2, name: 'Update Config', status: 'Completed' }
    ];
};
