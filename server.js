const express = require("express");
const session = require("express-session");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const user_process = require("./process/user_process.js");
const room_process = require("./process/room_process.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/view");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  const user = req.session.user;
  res.render("main.ejs", { user: user });
});

app.post("/login_process", (req, res) => {
  user_process.login_process(req, res);
});

app.get("/logout_process", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/join", (req, res) => {
  res.render("join.ejs");
});

app.post("/join_process", (req, res) => {
  user_process.join_process(req, res);
});

app.get("/room", (req, res) => {
  room_process.load_room(req, res);
});

app.get("/room/create", (req, res) => {
  room_process.create_room(req, res);
});

app.post("/room/create_process", (req, res) => {
  room_process.create_room_process(req, res);
});

app.get("/room/show_room", (req, res) => {
  room_process.show_room(req, res);
});

require("./io.js")(io);

module.exports = io;
http.listen(3000);
