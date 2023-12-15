const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

//Importacion de modelo
const Usuario = require('../models/Usuario');


//Controlador para crear usuario
const crearUsuario = async(req, res = response)=>{ 
    const { name, email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email:email });

        if( usuario ){
            return res.status(500).json({
                ok:false,
                message:'un usuario ya existe con ese correo'
            })
        }

        usuario = new Usuario(req.body);
        console.log('Esta es la informacion del nueevo usuario: ', usuario);

        //ENCRIPTAR: Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar JWT: Enviando el ID que se genera autometicamente en la base de datos al momento de crear el usuario
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            message: 'registro colocado exitosamente',
            email: usuario.email,
            name:usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Por favor hable con el adminstrado'
        })
    }
}

//Controlador para inicio de sesion
const iniciarSesion = async(req, res=response)=>{
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email:email });

        if( !usuario ){
            return res.status(500).json({
                ok:false,
                message:'Usuario con ese email no existe'
            })
        }

        //confirmar los passwords en base de datos con password dada
        const comparePassword = bcrypt.compareSync( password, usuario.password );

        if( !comparePassword ){
            return res.status(400).json({
                ok:false,
                messege: 'Password no valida'
            })
        }

        //Creacion de JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            message:'Usuario logro hacer login exitosamente',
            email: usuario.email,
            password: usuario.password,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Por favor hable con el adminstrado'
        })
    }
    
};


//Controlador para renovar token
const renovarToken = async(req, res = response)=>{

    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo JWT y generarlo en la peticion
    const token = await generarJWT(uid, name);
    
    res.json({
        message:'Se renovo el token exitosamente',
        ok:true,
        uid,
        name,
        token
    })
}



module.exports = {
    crearUsuario,
    iniciarSesion,
    renovarToken
}