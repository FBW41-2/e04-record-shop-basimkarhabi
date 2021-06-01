const {body} =require("express-validator");

module.exports= [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('This is not a valid email address'),
    body('password')
        .isStrongPassword()
        .withMessage('This password is not secure enough!!!'),
    body('firstName')
        .exists()
        // Sanitization
        .trim()
        .withMessage('Please enter your First name')
  ]