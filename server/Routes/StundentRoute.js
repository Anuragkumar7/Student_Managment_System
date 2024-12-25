import express from "express";
import conn from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/student_login", (req, res) => {
  console.log(req.body);
  const sql = "SELECT* FROM students Where email=?";
  conn.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err)
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "student", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE id = ?";
    conn.query(sql, [id], (err, result) => {
        if (err) return res.json({ status: false });
         return res.json(result);
    })
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.json({ status: true});
})

export { router as StudentRouter };
