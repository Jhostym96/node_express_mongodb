import {Reserva}  from "../models/Reserva.js";

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
      let { id_user, id_field, hora_inicio, fecha_reserva,  disponibilidad} = req.body;
  
      const reserva = new Reserva({
        id_user,
        id_field,
        hora_inicio,
        fecha_reserva,
        disponibilidad
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
      const { id_user, id_field, hora_inicio, hora_fin, disponibilidad, fecha_reserva } = req.body;
  
      const reserva = await Reserva.findById(id);
  
      if (!reserva) return res.status(404).json({ error: "No existe el campo" });
  
      
      reserva.id_user = id_user;
      reserva.id_field = id_field;
      reserva.hora_inicio = hora_inicio;
      reserva.fecha_reserva = fecha_reserva;
      reserva.disponibilidad = disponibilidad;
      reserva.hora_fin = hora_fin
  
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