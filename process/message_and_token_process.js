const db = require("../db.js");

exports.set_token = (userId, roomId, socketId, callback) => {
  db.query(
    `select * from tokens where userId=? and roomId=?`,
    [userId, roomId],
    (error, result) => {
      if (error) return callback(error);

      if (result[0]) {
        //result가 있다면 socket.id를 db에 저장된 걸로 바꿈
        callback(null, result[0]);
      } else {
        //없다면 새로 저장
        db.query(
          `insert into tokens (userId,roomId,token) values(?,?,?)`,
          [userId, roomId, socketId],
          (error2, result2) => {
            if (error2) return callback(error2);
            callback(null, null);
          }
        );
      }
    }
  );
};

delete_token = (id, roomId) => {
  //userId=users.id
  db.query(
    `delete from tokens where userId=? and roomId=?`,
    [id, roomId],
    (error, result) => {
      if (error) return error;
    }
  );
};

exports.save_message = (userId, roomId, message) => {
  db.query(
    `insert into messages (userId, roomId, message) values(?,?,?)`,
    [userId, roomId, message],
    (error, result) => {
      if (error) return error;
    }
  );
};

exports.get_messages = async (userId, roomId) => {
  //자신이 입장한 후의 메시지부터 보이게
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT users.userId, messages.message FROM messages
      JOIN users ON messages.userId = users.id WHERE messages.roomId = ?
      AND messages.id >= (
      SELECT messages.id
      FROM messages
      WHERE message = ? AND roomId = ?
      ) ORDER BY messages.id;`,
      [roomId, userId + "님이 입장하셨습니다", roomId],
      (error, messages) => {
        if (error) return reject(error);
        else resolve(messages);
      }
    );
  });
};

exports.delete_message = (id, roomId) => {
  //방을 나간 사람의 메시지는 삭제
  db.query(
    `delete from messages where userId=? and roomId=?`,
    [id, roomId],
    (error, result) => {
      if (error) return error;
    }
  );
  //사용자 토큰(socket.id) 삭제
  delete_token(id, roomId);
};
