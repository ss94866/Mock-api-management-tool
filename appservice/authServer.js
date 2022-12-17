const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();
const bcrypt = require("bcrypt");
const connectDb = require("./config/db");

let conn = connectDb();
const {User, RefreshToken} = require("./models/userSchema");

let refreshTokens = [];

app.post("/createUser", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("User already exists.");
    } 
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username,
      password: hashPassword,
    });

    if (user)
      return res
        .status(201)
        .send({ error: false, message: "User Created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(403).send(err.message);
  }
});

app.post("/token",async (req, res) => {
  const token = req.body.refreshToken;

  if (token == null) return res.status(401).send();
  
  // if (refreshTokens.includes(token)) {
  if (await RefreshToken.findOne({userId: req.body.userId})) {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    console.log(user);
    const accessToken = generateToken({ name: user.name, userId: user.userId });
    return res.status(201).send({ accessToken: accessToken });
  } else {
    return res.status(401).send();
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  try {
    const currUser = await User.findOne({ username: username });
    if (!currUser) {
      return res.status(401).send({ error: null, message: "User not found." });
    }
    if (
      req.body.password &&
      (await bcrypt.compare(req.body.password, currUser.password))
    ) {
      const user = { userId: currUser._id,name: username };
      const accessToken = generateToken(user);
      console.log(accessToken);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      const refToken = await RefreshToken.create({userId: currUser._id, refreshToken:refreshToken})

      return res.json({ accessToken: accessToken, refreshToken: refreshToken, userId: user.userId, name: user.name });
    } else {
      return res.status(400).send("Incorrect password");
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send(error.message);
  }
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (refreshToken) => refreshToken !== req.body.refreshToken
  );
});

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

app.listen(5000);
