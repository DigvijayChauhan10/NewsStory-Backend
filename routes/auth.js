const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

const JWT_SECRET = "#11%6@2001";

router.post("/creatuser", (req, res, next) => {
  User.findOne({ email: req.body.email }, { email: 1, _id: 0 })
    .then((user) => {
      if (user) return res.status(400).json({ error: "User Already exists" });

      bcrypt.hash(req.body.password, 12).then((hashPassword) => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
        }).then((user) => {
          const data = {
            user: {
              id: user._id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          res.json({ authToken });
        });
      });
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return res.status(400).json({ error: "Please, Try to login with correct" });
    }
    bcrypt.compare(req.body.password , user.password).then((isMatch) => {
      if (isMatch) {
        const data = {
          user: {
            id: user._id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
      } else {
        res.status(400).json({ error: "Please, Try to login with correct credentials" });
      }
    });
  })
  .catch((err) => console.log(err));
});
module.exports = router;
