import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

const fetchLatest = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/notification/latest');
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

const connect = (onReceive, onConnected = () => {}) => {
  const socket = new SockJS('http://localhost:8080/notification-websocket');
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('WebSocket connected (notifications)');
      stompClient.subscribe('/topic/notifications', (message) => {
        if (!message.body) return;
        const notif = JSON.parse(message.body);
        onReceive(notif);
      });
      onConnected(stompClient);
    },
    onStompError: (frame) => {
      console.error('STOMP error:', frame.headers['message'], frame.body);
    }
  });

  stompClient.activate();
};

const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log('WebSocket disconnected (notifications)');
  }
};

export default {
  fetchLatest,
  connect,
  disconnect,
};
