import { body, validationResult } from "express-validator";

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({
    errors: errors.array(),
  });
};
export const registerValidator = [
  body("username").isString().withMessage("username should string"),
  body("email").isEmail().withMessage("use Proper Mail"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters"),
  validator,
];
