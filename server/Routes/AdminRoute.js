import express from "express";
import conn from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  console.log(req.body);
  const sql = "SELECT* FROM admin Where email=? AND password=? ";
  conn.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id},
        "jwt_secret_key",
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      res.json({ loginStatus: false, message: "Wrong email or Password" });
    }
  });
});


router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Failed to get categories" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) values(?)";
  conn.query(sql, [req.body.category], (err, result) => {
    if (err) {
      return res.json({ Status: false, message: "Failed to add category" });
    } else {
      return res.json({ Status: true });
    }
  });
});
// image upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/add_student", upload.single("image"), (req, res) => {
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.json({ Status: false, message: "Failed to hash password" });
    }
    const sql = `INSERT INTO students (name, email, password, salary, address, category_id, image_path) VALUES (?)`;

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      parseInt(req.body.category_id),
      req.file.filename,
    ];

    conn.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ Status: false, message: "Failed to add student" });
      } else {
        return res.json({ Status: true });
      }
    });
  });
});

//get student information from database

router.get("/student", (req, res) => {
  const sql = "SELECT * FROM students";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Failed to get students" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});

router.get("/student/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sql = "SELECT * FROM students WHERE id = " + id;
  conn.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Failed to get students" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});
router.put("/edit_student/:id", (req, res) => {
  const id = req.params.id; // Get the ID from params

  // SQL query to update the student
  const sql = `UPDATE students SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?`;

  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ];

  // Execute the query
  conn.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Status: false, Message: err.message });
    }

    return res.status(200).json({
      Status: true,
      Message: "Student updated successfully",
      Result: result,
    });
  });
});

router.delete("/delete_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM students WHERE id = ?`;
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Massage: err.message });
    return res.json({ Status: true, Message: "Student deleted successfully" });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "SELECT COUNT(*) as admin FROM admin";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Message: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/student_count", (req, res) => {
  const sql = "SELECT COUNT(*) as students FROM students";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Message: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/total_salary", (req, res) => {
  const sql = "SELECT SUM(salary) as salary FROM students";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Message: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admins", (req, res) => {
  const sql = "SELECT * FROM admin";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Message: err.message });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_admin/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const sql = "DELETE FROM admin WHERE id =?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Message: err.message });
    return res.json({ Status: true, Message: "Admin deleted successfully" });
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ Status:true, Message: 'Logged out successfully' });
})

export { router as adminRouter };
