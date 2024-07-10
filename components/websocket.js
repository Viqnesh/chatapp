import React, { useEffect } from 'react';
import { View } from 'react-native';

const WSCompo = () => {
  useEffect(() => {

    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setDendams(data))
      .catch(error => console.error('Error fetching tasks:', error));

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connexion WebSocket établie');
      ws.send('Hello, serveur WebSocket !');
    };

    ws.onmessage = (event) => {
      console.log('Message reçu du serveur : ', event.data);
    };

    ws.onerror = (error) => {
      console.error('Erreur WebSocket : ', error);
    };

    ws.onclose = () => {
      console.log('Connexion WebSocket fermée');
    };

    return () => {
      ws.close();
    };
  }, []);

  return <View>{/* Ton code et composants existants */}</View>;
};

export default WSCompo;