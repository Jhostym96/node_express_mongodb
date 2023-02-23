import { validationResult, body } from "express-validator";
import axios from "axios"

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyLinkValidator = [
  body("longLink", "formato link incorrecto").trim().notEmpty()
  .custom(async value => {
    try {
      if(!value.startsWith('https://')){
        value = 'https://' + value
      }
      await axios.get(value);
      return value;
    } catch (error) {
      // console.log(error);
      throw new Error("not found longlink 404")
    }
  }),
validationResultExpress
]

export const bodyRegisterValidator = [
  body('userName', "Error formato usuario")
  .trim()
  .isLength({ min: 1 }),
  body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', "Minimo 6 caracteres")
    .trim()
    .isLength({ min: 6 }),
  body('password', "Formato de password incorrecta")
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coninciden las contraseñas")
      }
      return value
    }),
  validationResultExpress
];

export const bodyLoginValidator = [
  body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', "Minimo 6 caracteres")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
];

