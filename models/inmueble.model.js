const { Schema, model } = require('mongoose');
const { getErrorFieldStr, ErrorType } = require('../helpers/errormsg_utils');

const InmuebleSchema = new Schema({
    piso: {
        type: Number,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'piso')],
        validate: {
            validator: Number.isInteger,
            message: getErrorFieldStr(ErrorType.ERROR_INT_FIELD, 'piso', '{VALUE}')
        },
        min: [0,   getErrorFieldStr(ErrorType.ERROR_MIN_VALUE_FIELD, 'piso', '0 (bajo)')],
        max: [200, getErrorFieldStr(ErrorType.ERROR_MAX_VALUE_FIELD, 'piso', '200')]
    },
    letra: {
        type: String,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'letra')],
        trim: true,
        uppercase: true,
        maxlength: [1, getErrorFieldStr(ErrorType.ERROR_MAX_LENGTH_FIELD, 'letra')]
    },
    extension: {
        type: Number,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'extension')],
        validate: {
            validator: Number.isInteger,
            message: props => getErrorFieldStr(ErrorType.ERROR_INT_FIELD, 'extension', props.value)
        },
        min: [0, getErrorFieldStr(ErrorType.ERROR_MIN_VALUE_FIELD, 'extension', '0')],
    },
    habitaciones: {
        type: Number,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'habitaciones')],
        validate: {
            validator: Number.isInteger,
            message: getErrorFieldStr(ErrorType.ERROR_INT_FIELD, 'habitaciones', '{VALUE}')
        },
        min: [0, getErrorFieldStr(ErrorType.ERROR_MIN_VALUE_FIELD, 'habitaciones', '0')],
    },
    alquilado: {
        type: Boolean,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'alquilado')]
    },
    propietario: {
        type: String,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'propietario')],
        trim: true
    },
    email: {
        type: String,
        required: [true, getErrorFieldStr(ErrorType.ERROR_MANDATORY_FIELD, 'email')],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, getErrorFieldStr(ErrorType.ERROR_EMAIL_FIELD, '{VALUE}')]
    }
});

module.exports = model('inmueble', InmuebleSchema);