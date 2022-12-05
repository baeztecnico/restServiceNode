

const validarCampos         = require('../middleware/validar-campos');
const  validarJWT           = require('../middleware/validar-jwt');
const  validarroles         = require('../middleware/validar-roles');
const  validarArchivoSubir  = require('../middleware/validarExisteFile');

module.exports ={
    ...validarCampos,
    ...validarJWT,
    ...validarroles,
    ...validarArchivoSubir,
}