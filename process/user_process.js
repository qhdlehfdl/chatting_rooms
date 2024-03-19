const db = require("../db.js");
// const session = require("express-session");

exports.login_process = (req, res) => {
  const { id, password } = req.body;

  db.query(
    "select * from users where userId = ? and password = ?",
    [id, password],
    (error, user) => {
      if (error) return error;
      if (user.length > 0) {
        req.session.user = { id: user[0].id, userId: user[0].userId };
        res.redirect("/");
      } else {
        res.send(
          `<script>alert('로그인 정보를 확인해주세요.');history.back();</script>`
        );
      }
    }
  );
};

exports.join_process = (req, res) => {
  const { id, password } = req.body;

  db.query(
    `insert into users(userId,password) values(?,?)`,
    [id, password],
    (error, result) => {
      if (error) return error;
      res.send(
        `<script>alert('회원가입에 성공했습니다');location.href="/";</script>`
      );
    }
  );
};
