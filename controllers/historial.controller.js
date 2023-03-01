import { Reserva } from "../models/Reserva.js";

export const getPast = async (req, res) => {
  try {

    const reservas = await Reserva.find({ id: req.id });

    // < Pasado
    //OPCION 1: const reservasPasadas = reservas.filter(reservas => reservas.fecha_reserva >= new Date());
    const reservasPasadas = reservas.filter(reservas => reservas.fecha_reserva < Date.now());

    return res.json({ reservasPasadas });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};



export const getFuture = async (req, res) => {
  try {

    // > Futuro
    const reservas = await Reserva.find({ id: req.id });
    //OPCION 1: const reservasFuturas = reservas.filter(reservas => reservas.fecha_reserva > Date.now());
    //OPCION 2(Sin el uso del req): const reservasFuturas = await Reserva.find({ fecha_reserva: { $gt: new Date() } })
    const reservasFuturas = reservas.filter(reservas => reservas.fecha_reserva > new Date());


    return res.json({ reservasFuturas });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};