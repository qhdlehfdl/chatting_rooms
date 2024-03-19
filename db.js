const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gh5968",
  database: "chatting",
});

db.connect();
module.exports = db;
