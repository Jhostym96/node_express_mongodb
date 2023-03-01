import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaReserva = new Schema({
    id_user: [{
        type : mongoose.Types.ObjectId,
        name: String,
        ref: 'User',
        require : true
    }],

    id_field:[{
        type : mongoose.Types.ObjectId,
        name: String,
        ref: 'Link',
        require : true
    }],

    fecha_reserva:{
        type: Date,
        required: true
    },

    hora_inicio:{
        type: Date,
        required: true
    },
    hora_fin:{
        type: Date,
        required: true
    },

    disponibilidad:{
        type: Boolean,
        required:false
    }

    
});

export const Reserva = model('Reserva', schemaReserva)

