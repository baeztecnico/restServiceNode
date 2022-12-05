
const {Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, obtenerImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarExisteArchvio} = require('../middleware');

const router = Router();

router.post('/',validarExisteArchvio,cargarArchivos);
router.put('/:coleccion/:id',[
    validarExisteArchvio,
    check('id','No es un id valido').isMongoId().bail(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary);
router.get('/:coleccion/:id',[
    check('id','No es un id valido').isMongoId().bail(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
],obtenerImagen);
module.exports = router;