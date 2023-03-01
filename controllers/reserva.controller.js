import { Reserva } from "../models/Reserva.js";

export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find({ id: req.id });

    return res.json({ reservas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};
//req contiene la informacion
//res te devuelve la informacion

export const createReservas = async (req, res) => {
  try {
    let { id_user, id_field, hora_inicio, hora_fin, fecha_reserva } = req.body;

    // Comprobamos disponibilidad de horario
    const reservasSolapadas = await Reserva.find({
      id_field,
      fecha_reserva,
      $or: [
        { hora_inicio: { $gte: hora_inicio, $lt: hora_fin } },
        { hora_fin: { $gt: hora_inicio, $lte: hora_fin } },
        {
          $and: [
            { hora_inicio: { $lte: hora_inicio } },
            { hora_fin: { $gte: hora_fin } },
          ],
        },
      ],
    });

    if (reservasSolapadas.length > 0) {
      return res
        .status(400)
        .json({ msg: "Ya hay una reserva en ese horario." });
    }

    // Crear nueva reserva, automatiamente
    const reserva = new Reserva({
      id_user,
      id_field,
      fecha_reserva,
      hora_inicio,
      hora_fin,
      disponibilidad: true,
    });

    const newReserva = await reserva.save();

    return res.status(201).json({ newReserva });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const getReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);

    if (!reserva) return res.status(404).json({ error: "No existe el campo" });

    return res.json({ reserva });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const deleteReservas = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);

    if (!Reserva) return res.status(404).json({ error: "No existe reserva" });

    await reserva.remove();

    return res.json({ reserva });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "Ya no existe el campo" });
  }
};

export const updateReservas = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_user,
      id_field,
      hora_inicio,
      hora_fin,
      disponibilidad,
      fecha_reserva,
    } = req.body;

    const reserva = await Reserva.findById(id);

    if (!reserva) return res.status(404).json({ error: "No existe el campo" });

    reserva.id_user = id_user;
    reserva.id_field = id_field;
    reserva.hora_inicio = hora_inicio;
    reserva.fecha_reserva = fecha_reserva;
    reserva.disponibilidad = disponibilidad;
    reserva.hora_fin = hora_fin;

    await reserva.save();

    return res.json({ reserva });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};
