


const {Router} = require('express');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users');

const{
    validarCampos,
    validarJWT,
    isAdminRol,
    tieneRol
} = require('../middleware');
const { esRolValido ,emailExiste,existeUsuarioById} = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id',
[
    check('id','No es un id valido').isMongoId().bail(),
    check('id').custom(existeUsuarioById).bail(),
    check('rol').custom(esRolValido),
    validarCampos,
],
 usuariosPut);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria y mas de seis letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    //isAdminRol,
    check('id','No es un id valido').isMongoId().bail(),
    check('id').custom(existeUsuarioById).bail(),
    validarCampos,
], usuariosDelete);

module.exports = router;