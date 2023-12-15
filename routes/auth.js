const  { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();
const { crearUsuario, iniciarSesion, renovarToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar-jwt');

router.post(
    '/new', 
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El campo introducido no es un email').isEmail(),
        check('password', 'El password debe tener una longitud minimade 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
);

router.post('/',
    [
        check('email', 'El email no es un email valido').isEmail(),
        check('password', 'El password debe tener una longitud minima de 6').isLength({min:6}),
        validarCampos
    ],
    iniciarSesion
);

router.get('/renew',[validarJWT] ,renovarToken);


module.exports = router;