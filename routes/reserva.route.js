import { Router } from "express";
import { getReservas, createReservas, deleteReservas, updateReservas, getReserva} from "../controllers/reserva.controller.js";
import { requireToken } from "../middlewares/requireToken.js";


const router = Router();

router.get('/',  getReservas);
router.get('/:id',  getReserva);
router.post('/', requireToken, createReservas);
router.delete('/:id',  deleteReservas);
router.patch('/:id',  updateReservas);


export default router;


