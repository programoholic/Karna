const io = require('socket.io')();
let clientCount=0;

io.on('connection', (clientSocket) => {
io.emit('userConnected',clientSocket.client.conn.server.clientsCount);
  clientSocket.on('disconnect', () => {
        console.log('*************** client left');
        io.emit('userConnected', clientSocket.client.conn.server.clientsCount );      
  });
});

module.exports = io;
