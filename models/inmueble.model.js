const { Schema, model } = require('mongoose');

const InmuebleSchema = new Schema({
    piso: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un entero válido'
        },
        min: [0, 'El menor piso válido es 0 (bajo)'],
        max: [200, 'El piso más alto válido es 200']
    },
    letra: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        maxlength: 1        
    },
    extension: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un entero válido'
        }
    },
    habitaciones: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un entero válido'
        }
    },
    alquilado: {
        type: Boolean,
        required: true
    },
    propietario: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '{VALUE} no es un email válido']
    }

});

module.exports = model('inmueble', InmuebleSchema);