import { Router } from 'express'
import {
  getUser,
  infoUser,
  login,
  logout,
  refreshToken, 
  register, 
} from '../controllers/auth.controllers.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

const router = Router()

router.post('/register',bodyRegisterValidator,register);
router.post('/login',bodyLoginValidator,login);


router.get('/user/:id',requireToken,getUser);


router.get('/protected', requireToken, infoUser);
router.get('/refresh', requireRefreshToken, refreshToken);
router.get('/logout', logout)


export default router;