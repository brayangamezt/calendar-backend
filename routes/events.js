const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

const { obtenerEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const { isDate } = require('../helpers/isDates');

const router = Router();

//Haciendo que todas las peticiones pasen por el middleware de la validacion de token
router.use(validarJWT);

//Obtener eventos
router.get('/' ,obtenerEvento);

//Crear evento
router.post(
    '/crearEvento',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put('/actualizarEvento/:id',actualizarEvento);

//Eliminar evento
router.delete('/eliminar/:id' ,eliminarEvento);

module.exports = router;