// WebSocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [dendams, setDendams] = useState("Test");



  // Logique de connexion WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/');

    ws.onopen = () => {
      console.log('WebSocket connected');

      setSocket(ws);
    };
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setSocket(null);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket , dendams, setDendams }} >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};