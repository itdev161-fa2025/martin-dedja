import express from "express";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});