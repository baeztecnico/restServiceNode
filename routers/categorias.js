
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSing } = require('../controllers/auth');
const { crearCategoria, actualizarCategoria, obtenerCategoriaById, obtenerCategorias, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaById } = require('../helpers/db-validators');
const { validarJWT } = require('../middleware');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

//obtener todas las categorias
router.get('/', obtenerCategorias);

//obtener categoria por id
router.get('/:id', [
    check('id','No es un id valido').isMongoId().bail(),
    check('id').custom(existeCategoriaById),
    validarCampos,

], obtenerCategoriaById);

//crear categoria privado

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar por id
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaById),
],
    actualizarCategoria);

router.delete('/:id',[
    validarJWT
],borrarCategoria);
module.exports = router;