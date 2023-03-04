import mongoose from "mongoose";

const { Schema, model } = mongoose;

const fieldSchema = new Schema({
  nameField: {
    type: String,
    required: true,
    trim: true,
  },
  adress: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: String,
    required: true,
    trim: true,
  },
  priceForHour: {
    type: String,
    required: true,
    trim: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Revisar
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  img1: {
    type: String,
    required: false,
  },
  img2: {
    type: String,
    required: false,
  },
  img3: {
    type: String,
    required: false,
  },
  img4: {
    type: String,
    required: false,
  },
  img5: {
    type: String,
    required: false,
  },
  img6: {
    type: String,
    required: false,
  },
  img7: {
    type: String,
    required: false,
  },
  img8: {
    type: String,
    required: false,
  },
  img9: {
    type: String,
    required: false,
  },
});

export const Field = model('Field', fieldSchema)