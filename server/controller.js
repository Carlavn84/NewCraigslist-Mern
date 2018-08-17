const bodyparser = require("body-parser");
var { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Post = require("./models/Post");

module.exports = function(app) {

    var register = (req, res) => {
        const user = new User(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.send({ status: "error", errors: errors.mapped() });
        }
        user.password = user.hashPassword(user.password);
        user
          .save()
          .then(user => {
            return res.send({ status: "success", message: "registerd successfuly" });
          })
          .catch(error => {
            console.log(error);
            return res.send({ status: "error", message: error });
          });
      };
      
    app.post(
        "/api/register",
        [
            check("email")
                .not()
                .isEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Email should be a valid one"),
            check("firstname")
                .not()
                .isEmpty()
                .withMessage("First name is required")
                .isLength({ min: 2 })
                .withMessage("Name should be at least 2 letters")
                .matches(/^([A-z]|\s)+$/)
                .withMessage("Name cannot have numbers"),
            check("lastname")
                .not()
                .isEmpty()
                .withMessage("Last name is required")
                .isLength({ min: 2 })
                .withMessage("Last name should be at least 2 letters"),
            check("password")
                .not()
                .isEmpty()
                .withMessage("Password is required")
                .isLength({ min: 6 })
                .withMessage("Password should be at least 6 characters"),
            check(
                "password_confirm",
                "Password confirmation  is required or should be the same as password"
            ).custom(function(value, { req }) {
                if (value !== req.body.password) {
                throw new Error("Password don't match");
                }
                return value;
            }),
            check("email").custom(value => {
                return User.findOne({ email: value }).then(function(user) {
                if (user) {
                    throw new Error("This email is already in use");
                }
                });
            })
        ],
        register
    );


    var login = (req, res) => {
        console.log(req.body.email);
        User.findOne({
          email: req.body.email
        })
          .then(function(user) {
            if (!user) {
              return res.send({ error: true, message: "User does not exist!" });
            }
            if (!user.comparePassword(req.body.password, user.password)) {
              return res.send({ error: true, message: "Wrong password!" });
            }
            req.session.user = user;
            req.session.isLoggedIn = true;
            return res.send({ message: "You are signed in" });
            res.send(user);
          })
          .catch(function(error) {
            console.log(error);
          });
      };
      
    app.post(
        "/api/login",
        [
            check("email")
              .not()
              .isEmpty()
              .withMessage("Email is required"),
            check("password")
              .not()
              .isEmpty()
              .withMessage("Password is required")
        ],  
         login
    );


    var isLoggedIn = (req, res) => {
        if (req.session.user)
          User.findById(req.session.user._id)
            .then(user => {
              return user
                ? res.json(user)
                : res.status(422).json({ msg: "The authentication failed." });
            })
            .catch(err => console.log(err));
        else res.status(422).json({ msg: "The authentication failed" });
      };
      app.get("/api/isloggedin", isLoggedIn);


    var postLising = (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send({ status: 'error', errors: errors.mapped() })
        }
        var post = new Post(req.body);
        post.user = req.session.user._id;    
        post.save()
        .then(post => {return res.send({ status: 'success', message: 'List created successfuly' }) })
            .catch(error => {
                console.log(error);
                return res.send({ status: 'error', message: error })
            })
    }

    app.post(
        "/api/addlist",
        [
            check("title")
                .not()
                .isEmpty()
                .withMessage("Title is required"),              
            check("description")
                .not()
                .isEmpty()
                .withMessage("Description is required")
                .isLength({ min: 5 })
                .withMessage("Description should be at least 5 letters"),
            check("location")
                .not()
                .isEmpty()
                .withMessage("Location is required"),
            check("price")
                .not()
                .isEmpty()
                .withMessage("Price is required")
                .isNumeric()
                .withMessage("Price should be number"),
            check("contact")
                .not()
                .isEmpty()
                .withMessage("Contact is required")           
      
        ],
        postLising
      );
    


















      var logout = (req, res) => {
        req.session.destroy();
        res.json({ logout: true });
      };
      app.get("/api/logout", logout);






}