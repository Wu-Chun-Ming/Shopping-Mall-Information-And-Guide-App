let socket;

export const connectWebSocket = () => {
  socket = new WebSocket('ws://your-websocket-server.com/events');
  
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };
};

// Assuming socket is already initialized somewhere in your code

export const fetchEvents = () => {
  return new Promise((resolve, reject) => {
    socket.send(JSON.stringify({ action: 'fetchEvents' }));

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'fetchEvents' && data.success) {
        resolve(data.events); // Resolve with events data
      } else {
        reject(new Error('Failed to fetch events'));
      }
    };

    socket.onerror = (error) => {
      reject(new Error(`WebSocket Error: ${error.message}`));
    };
  });
};

export const fetchEventById = (id) => {
  return new Promise((resolve, reject) => {
    socket.send(JSON.stringify({ action: 'fetchEventById', id }));

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'fetchEventById' && data.success) {
        resolve(data.event); // Resolve with event data
      } else {
        reject(new Error('Failed to fetch event'));
      }
    };

    socket.onerror = (error) => {
      reject(new Error(`WebSocket Error: ${error.message}`));
    };
  });
};
