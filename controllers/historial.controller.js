import { Reserva } from "../models/Reserva.js";

import { Field } from "../models/Field.js";

export const getPast = async (req, res) => {
  try {
    const reservas = await Reserva.find({ id: req.id });

    // < Pasado
    //OPCION 1: const reservasPasadas = reservas.filter(reservas => reservas.fecha_reserva >= new Date());
    const reservasPasadas = reservas.filter(
      (reservas) => reservas.fecha_reserva < Date.now()
    );

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
    const reservasFuturas = reservas.filter(
      (reservas) => reservas.fecha_reserva > new Date()
    );

    console.log(reservasFuturas);

    const respuesta = await Promise.all(
      reservasFuturas.map(async (reserva) => {
        const cancha = await Field.findById(reserva.id_field[0]);
        return {
          ...reserva.toJSON(),
          cancha: cancha?.toJSON(),
        };
      })
    );

    return res.json({ reservasFuturas: respuesta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};
