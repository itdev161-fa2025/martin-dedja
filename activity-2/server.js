import express from "express";
import connectDB from "./config/db.js";
import { check, validationResult } from "express-validator";
import cors from "cors";

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post(
  "/api/users",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      return res.send("Data received");
    }
  }
);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
