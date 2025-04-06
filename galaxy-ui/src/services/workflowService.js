import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const BASE_URL = "http://localhost:8080/api/workflows";

export const fetchWorkflows = async () => {
  const response = await fetch(`${BASE_URL}`);
  return await response.json();
};

export const fetchWorkflowLog = async (processInstanceId) => {
  try {
    const response = await fetch(`${BASE_URL}/workflow/${processInstanceId}`);
    if (!response.ok) throw new Error("Failed to fetch Workflow Log");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Workflow Log:", error);
    return { bpmnXml: "" };
  }
};

export const fetchTaskLog = async (processInstanceId, taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/workflow/${processInstanceId}/task/${taskId}/log`);
    if (!response.ok) throw new Error("Failed to fetch Task Log");
    return await response.text();
  } catch (error) {
    console.error(`Error fetching Task Log for ${taskId}:`, error);
    return "Error fetching task log.";
  }
};

export const pauseWorkflow = async (workflowId) => {
  const response = await fetch(`${BASE_URL}/${workflowId}/pause`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to pause workflow");
  return await response.json();
};

export const resumeWorkflow = async (workflowId) => {
  const response = await fetch(`${BASE_URL}/${workflowId}/resume`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to resume workflow");
  return await response.json();
};

export const retryWorkflow = async (workflowId) => {
  const response = await fetch(`${BASE_URL}/${workflowId}/retry`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to retry workflow");
  return await response.json();
};

export const stopWorkflow = async (workflowId) => {
  const response = await fetch(`${BASE_URL}/${workflowId}/stop`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to stop workflow");
  return await response.json();
};

export const killWorkflow = async (workflowId) => {
  const response = await fetch(`${BASE_URL}/${workflowId}/kill`, { method: "POST" });
  if (!response.ok) throw new Error("Failed to kill workflow");
  return await response.json();
};

/**
 * Subscribes to WebSocket workflow updates.
 * @param {string} processInstanceId 
 * @param {(taskId: string, status: string) => void} onMessage 
 * @param {(client: any) => void} onConnected 
 */
export const subscribeToWorkflowUpdates = (processInstanceId, onMessage, onConnected) => {
  const socket = new SockJS('http://localhost:8080/workflow-websocket');
  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('WebSocket connected (via service)');
      stompClient.subscribe(`/topic/progress/${processInstanceId}`, (message) => {
        if (!message.body) return;
        const { taskId, status } = JSON.parse(message.body);
        onMessage(taskId, status);
      });
      onConnected(stompClient);
    },
    onStompError: (frame) => {
      console.error('STOMP error:', frame.headers['message'], frame.body);
    }
  });

  stompClient.activate();
  return stompClient;
};
