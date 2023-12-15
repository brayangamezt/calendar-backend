const express = require('express');
const { validationResult } = require('express-validator');

//Dentro de esta funcion vamos a tener los datos que han pasado hasta ese momemnto en la request
const validarCampos = (req ,res = express.response ,next)=>{

    const errors = validationResult(req);
    if( !errors.isEmpty() ){

        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        })
    }

    next()
};

module.exports = {
    validarCampos
}