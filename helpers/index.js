

const dbValidatos       = require('./db-validators');
const generarJSONweb    = require('./generarJSONWEB');
const googleVerify      = require('./google-verify');
const subirFile         = require('./subir-archivo');

module.exports = {
    ...dbValidatos,
    ...generarJSONweb,
    ...googleVerify,
    ...subirFile
}