const socket = io('http://localhost:3000'); // Replace with your server URL

    socket.on('connect', () => {
      console.log('Connected to server');

      // Emit events to the server
      socket.emit('eventName', 'Hello from client');
    });

    socket.on('responseEvent', (data) => {
      console.log('Received response:', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });