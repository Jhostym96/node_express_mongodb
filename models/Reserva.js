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
        type: String,
        required: false
    },

    hora_inicio:{
        type: mongoose.Schema.Types.String,
        validate: {
            validator: (valor) => {
                return /([0-2][0-2]:[0-2][0-2])/.test(valor)

            },
            message: "El formato debe ser desde 00:00 hasta 23:59",
        },
    },

    hora_fin: mongoose.Schema.Types.String,

    disponibilidad:{
        type: Boolean,
        required:false
    }

    
});

export const Reserva = model('Reserva', schemaReserva)

