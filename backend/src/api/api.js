const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../schemas/User");
const JWT_KEY = "secret";
const Note = require("../schemas/Note");
let Authenticator = require("./authenticator");

// router.get("/test", (req, res, next) => {
//   res.send("hello");
// });

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) {
      return res.json({
        status: false,
        message: "email already exists"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.json({
            status: false,
            message: "Server error"
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            name: req.body.username
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.json({
                status: true,
                message: "User Created"
              });
            })
            .catch(err => {
              res.json({
                status: false,
                message: "Server error"
              });
            });
        }
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .then(user => {
      if (user.length < 1) {
        res.json({
          status: false,
          message: "Invalid Email id"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
          if (error) {
            return res.json({
              status: false,
              message: "Invalid Password"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                //generates token
                userId: user[0]._id
              },
              JWT_KEY,
              {
                expiresIn: "24h"
              }
            );
            return res.json({
              status: true,
              message: "Successfully loged in",
              token: token
            });
          }
          res.json({
            status: false,
            message: "Auth failed"
          });
        });
      }
    })
    .catch(err => {
      res.json({
        status: false,
        message: "Server error"
      });
    });
});

router.get(
  "/fetchallnotes",
  Authenticator.isAuthenticated,
  (req, res, next) => {
    //code
    Note.find({ createdby: req.user._id })
      .sort({ updatedAt: 1 })
      .then(result => {
        res.json({
          status: true,
          message: "Notes fetched successfully",
          data: result
        });
      })
      .catch(err => {
        res.json({
          status: false,
          message: "Server error"
        });
      });
  }
);

router.post(
  "/createupdate",
  Authenticator.isAuthenticated,
  (req, res, next) => {
    console.log(req.body);
    //code
    var id = req.body.id;
    if (id) {
      Note.findById(id)
        .then(result => {
          if (result) {
            result.heading = req.body.heading;
            result.body = req.body.body;
            result
              .save()
              .then(result => {
                console.log(result);
                res.json({
                  status: true,
                  message: "Note updated"
                });
              })
              .catch(err => {
                res.json({
                  status: false,
                  message: "Unable to update note"
                });
              });
          } else {
            res.json({
              status: false,
              message: "Invalid note id"
            });
          }
        })
        .catch(err => {
          res.json({
            status: true,
            message: "Server error"
          });
        });
    } else {
      var note = new Note({
        heading: req.body.heading,
        body: req.body.body,
        createdby: req.user.id
      });
      note
        .save()
        .then(result => {
          res.json({
            status: true,
            message: "Notes created",
            data: result
          });
        })
        .catch(err => {
          res.json({
            status: false,
            message: "Server error"
          });
        });
    }
  }
);

module.exports = router;
