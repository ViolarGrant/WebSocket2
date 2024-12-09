const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.send("Welcome to the chat!");

  ws.on("message", (message) => {
    console.log("Recived:", message);
    wss.clients.forEach((client) => {
      if (client != ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client closed");
  });

  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
  });
});
console.log("WebSocket server started on port 8080");
