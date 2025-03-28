export const fetchProcesses = async () => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch("/api/processes");
    // return await response.json();
  
    return [
      { name: "chrome.exe", processId: 4321, memory: "200MB", peakMemory: "500MB", thread: 12, path: "C:\\Program Files\\Google\\Chrome.exe" },
      { name: "node.exe", processId: 1234, memory: "150MB", peakMemory: "300MB", thread: 8, path: "C:\\Program Files\\NodeJS\\node.exe" }
    ];
  };
  