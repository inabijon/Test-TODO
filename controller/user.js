const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const { User } = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      user.save().then(
        () => {
          res.status(201).json({
            message: 'User added successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  );
};

exports.userLogin =  (req, res, next) => {

  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Email or password error",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Email or password error",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        secrets.jwtSecret,
        { expiresIn: "1h" }
      );

    res.status(200).json({
        token: token,
        expiresIn: 3600,
        message: "Successfully Login",
      });

    }).catch((error) => {
      return res.status(401).json({
        message: "Auth failed",
        error: err,
      });
    });
};
