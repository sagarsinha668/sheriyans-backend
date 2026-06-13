import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const validateRegisterUser = [
  body("fullname")
    .notEmpty()
    .withMessage("Full Name is required")
    .isLength({ min: 3 })
    .withMessage("Full Name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("contact")
    .matches(/^\d{10}$/)
    .withMessage("Must be 10 Digits Number"),

    validateRequest
];
