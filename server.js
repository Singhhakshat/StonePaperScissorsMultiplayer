const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "https://singhhakshat.github.io/StonePaperScissorsMultiplayer",
      methods: ["GET", "POST"]
    }
  });

io.on("connection", (socket) => {
    console.log('a device connected');
});

httpServer.listen(3000);