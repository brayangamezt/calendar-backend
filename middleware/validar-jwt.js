const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) =>{

    //X-TOKEN en los headers: El token se envia a travez de los headers en el apartado x-token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            message:'NO existen tokens validos en la peticion'
        })
    }

    try {

        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );
        console.log('Este es el payload: ', payload);

        req.uid = payload.uid;
        req.name = payload.name;
        req.saludo = 'hola a todos esto es mi saludo'
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            message:'TOKEN no valido'
        })
    }

    next();

}

module.exports = {
    validarJWT
}