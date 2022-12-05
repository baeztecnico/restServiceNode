
const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSing } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','el id token es necesario').not().isEmpty(),
    validarCampos
], googleSing);

module.exports = router;