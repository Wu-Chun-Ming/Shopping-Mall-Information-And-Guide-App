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

export const fetchEvents = (callback) => {
  socket.send(JSON.stringify({ action: 'fetchEvents' }));

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.action === 'fetchEvents' && data.success) {
      callback(data.events); // Pass the events data to the callback function
    }
  };
};

export const fetchEventById = (id, callback) => {
  socket.send(JSON.stringify({ action: 'fetchEventById', id }));

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.action === 'fetchEventById' && data.success) {
      callback(data.event); // Pass the event details to the callback function
    }
  };
};