import { Field } from "../models/Field.js";

// Traer todos las canchas

export const getFields = async (req, res) => {
  try {
    const fields = await Field.find({ id: req.id });

    return res.json({ fields });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

// Traer una sola cancha

export const getField = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findById(id);

    if (!field) return res.status(404).json({ error: "No existe el campo" });

    return res.json({ field });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};

// Crear un nueva cancha

export const createField = async (req, res) => {
  try {
    let {
      nameField,
      adress,
      capacity,
      priceForHour,
      img,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
    } = req.body;

    const field = new Field({
      nameField,
      adress,
      capacity,
      priceForHour,
      uid: req.uid,
      img,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
    });

    const newField = await field.save();

    return res.status(201).json({ newField });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

// Eliminar un campo

export const removeField = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findById(id);

    if (!field) return res.status(404).json({ error: "No existe el campo" });

    await field.remove();

    return res.json({ field });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};

// Actualizar un campo

export const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nameField,
      adress,
      capacity,
      priceForHour,
      img,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
    } = req.body;

    const field = await Field.findById(id);

    if (!field) return res.status(404).json({ error: "No existe el campo" });

    // Actualizar
    field.nameField = nameField;
    field.adress = adress;
    field.capacity = capacity;
    field.priceForHour = priceForHour;
    field.img = img;
    field.img1 = img1;
    field.img2 = img2;
    field.img3 = img3;
    field.img4 = img4;
    field.img5 = img5;
    field.img6 = img6;
    field.img7 = img7;
    field.img8 = img8;
    field.img9 = img9;

    await field.save();

    return res.json({ field });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};
