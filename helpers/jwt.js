const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject)=>{

        //Este es un objeto con la informacion opcional que le queremos poner a nuestro payload
        const payload = {uid, name}

        //Creo mi json webtoken utilizando la libreria de npm
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn:'2h'
        }, (err, token)=>{

            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }

            resolve(token);
        } )

    } );
}


module.exports = {
    generarJWT
}