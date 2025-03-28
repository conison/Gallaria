export const fetchWorkflows = async () => {
    // Simulating an API call (Replace later with actual API)
    // const response = await fetch("/api/workflows");
    // return await response.json();
  
    return [
      { id: 1, name: "Deploy NDC", status: "Running", details: "Deploying NDC with MECM", logs: "API Logs: Success\nBPMN Graph: Loading..." },
      { id: 2, name: "Promote Host", status: "Completed", details: "Host promoted to production", logs: "API Logs: Success\nWorkflow Completed" }
    ];
  };
  