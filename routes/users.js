const express = require("express");
const router = express.Router();
const {body} =require("express-validator");


const userValidators = [
  body('email')
  .isEmail().
  withMessage('This is not a valid email address')
  body('password')
  .isStrongPassword()
  .withMessage('This password is not secure enough')
]


const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  .post(userValidators,addUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
