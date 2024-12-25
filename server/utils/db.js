import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "studentms",
});

conn.connect((err) => {
  if (err) {
    console.error("Connection error" + err.message);
  } else {
    console.log("Connected to MySQL");
  }
});

export default conn;
