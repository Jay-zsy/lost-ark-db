import { Server } from 'http';
import { WebSocketServer } from 'ws';

import { application } from './application';
import { ENV } from './environment';

const PORT = process.env.PORT || 6001;
const server = new Server(application(ENV));

const wss = new WebSocketServer({ server });

wss.on("connection", socket => {
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode`);
});
