const message_and_token_process = require("./process/message_and_token_process");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
      const { id, userId, roomId } = data;
      message_and_token_process.set_token(
        id,
        roomId,
        socket.id,
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          }

          socket.join(roomId);

          if (result) {
            socket.id = result.token;
          } else {
            //처음 입장이라면 메시지 보여줌
            io.to(roomId).emit("enter_message", userId + " : 님이 입장하셨습니다");
            message_and_token_process.save_message(
              id,
              roomId,
              userId + "님이 입장하셨습니다"
            );
          }
        }
      );
    });

    socket.on("exit_room", (data) => {
      const { id, userId, roomId } = data;
      message_and_token_process.delete_message(id, roomId);
    });

    socket.on("send_message", (data) => {
      const { id, userId, roomId, message } = data;
      message_and_token_process.save_message(id, roomId, message);
      io.to(roomId).emit("return_message", {
        id: id,
        userId: userId,
        message: message,
      });
    });


  });
};
