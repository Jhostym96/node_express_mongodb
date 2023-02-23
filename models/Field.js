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
    ref: 'User',
    required: true,
  }
});

export const Field = model('Field', fieldSchema)