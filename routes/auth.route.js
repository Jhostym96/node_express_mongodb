import express from 'express'
import { login, register } from '../controllers/auth.controllers.js';
import { body } from 'express-validator';



const router = express.Router()

router.post('/register', [
  body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
  body('password', "Formato depassword incorrecta").isLength({ min: 6 })
  
], register);
router.post('/login', login);

export default router;