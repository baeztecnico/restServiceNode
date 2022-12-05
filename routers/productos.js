const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProductoById, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoaById, existeCategoriaById } = require('../helpers/db-validators');
const { validarCampos, validarJWT, isAdminRol } = require('../middleware');

const router = Router();

//obtener todas las categorias
router.get('/', obtenerProductos);

//obtener categoria por id
router.get('/:id', [
    check('id','No es un id valido').isMongoId().bail(),
    check('id').custom(existeProductoaById),
    validarCampos,

], obtenerProductoById);

//crear categoria privado

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos
], crearProducto);

//Actualizar por id
router.put('/:id', [
    validarJWT,
    check('categoria','No es un id valido').isMongoId(),
    check('id').custom(existeProductoaById),
],
    actualizarProducto);

router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoaById),
    validarCampos
],borrarProducto);
module.exports = router;