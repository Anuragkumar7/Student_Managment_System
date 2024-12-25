import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { StudentRouter } from "./Routes/StundentRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", adminRouter);
app.use("/student", StudentRouter);
app.use(express.static("Public"));

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt_secret_key";
const varifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ Status: false, Error: "Unauthorized access" });
    }

    Jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res
          .status(403)
          .json({ Status: false, Error: "Forbidden: Invalid token" });
      }

      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal server error" });
  }
};


app.get("/verify", varifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

const port = proccess.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
