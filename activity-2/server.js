import express from "express";
import connectDB from "./config/db.js";
import { check, validationResult } from "express-validator";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import auth from "./middleware/auth.js";

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
          name,
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: "10hr",
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }
);

app.get('/api/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Unknown server error');
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
