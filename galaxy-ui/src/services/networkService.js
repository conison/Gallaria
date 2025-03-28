export const fetchNetworkDetails = async () => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch("/api/network-details");
    // return await response.json();
  
    return [
      { dnsSuffix: "example.com", fqdn: "host1.example.com", name: "eth0", type: "Ethernet", ip: "192.168.1.10", mac: "AA:BB:CC:DD:EE:FF", gateway: "192.168.1.1", subnet: "255.255.255.0" }
    ];
  };
  