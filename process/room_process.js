const db = require("../db.js");
const message_and_token_process = require("./message_and_token_process.js");
// const express = require("express");
// const app = express();

// app.set("view engine", "ejs");
// app.set("views", "./view");

exports.load_room = (req, res) => {
  if (req.session.user) {
    db.query(`select * from rooms`, (error, results) => {
      if (error) return error;

      res.render("room_main.ejs", { rooms: results });
    });
  } else res.redirect("/");
};

exports.create_room = (req, res) => {
  if (req.session.user)
    res.render("create_room.ejs", { user: req.session.user });
  else res.redirect("/");
};

exports.create_room_process = (req, res) => {
  const { roomName, owner } = req.body;

  db.query(
    `insert into rooms (roomName,owner) values(?,?)`,
    [roomName, owner],
    (error, result) => {
      if (error) return error;
      res.redirect("/room");
    }
  );
};

exports.show_room = async (req, res) => {
  const { id } = req.query; //room.id

  if (req.session.user) {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(`select * from rooms where id=?`, [id], (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });

      const messages = await message_and_token_process.get_messages(req.session.user.userId, id);
      res.render("chat_room.ejs", { room: result[0], user: req.session.user, messages:messages });
    } catch (error) {
      console.error(error);
      res.render("/");
    }
  } else res.redirect("/");
};
