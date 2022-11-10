const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on(
    "sendMessage",
    ({ senderId, receiverId, text, img, filename, type }) => {
      const user = getUser(receiverId);
      if (img === 1) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          img,
          filename,
          type,
        });
      }
      console.log(senderId, receiverId, text);
    }
  );

  socket.on(
    "sendNotification",
    ({ senderId, receiverId, senderName, postId, type }) => {
      const receiver = getUser(receiverId);
      io.to(receiver.socketId).emit("getNotification", {
        senderId,
        receiverId,
        senderName,
        postId,
        type,
      });
      console.log(receiver);
    }
  );

  // socket.on("sendText", ({ senderId, receiverId, text }) => {
  //   const receiver = getUser(receiverId);
  //   io.to(receiver.socketId).emit("getText", {
  //     senderId,
  //     text,
  //   });
  // });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
console.log(users);
