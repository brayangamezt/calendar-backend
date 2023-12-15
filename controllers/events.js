const { response } = require('express');
const Evento = require('../models/Evento');

//Obtener eventos
const obtenerEvento = async(req, res = response) =>{

    const eventos = await Evento.find().populate('user');

    res.status(200).json({
        ok:true,
        eventos
    
    });
}

//Crear evento
const crearEvento = async(req, res = response) => {

    //Creacion de un nuevo evento
    const evento = new Evento( req.body );

    try {

        //Indicamos que el campo evento user, se va a llenar con la REQUEST UID que generamos en el middleware de validacion de token
        evento.user = req.uid
        const eventoGuardado = await evento.save();
        res.status(201).json({
            ok:true,
            evento:eventoGuardado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Comuniquese con el administrador'
        });
    }
}

//********************************************* Actualizar evento ****************************************************
const actualizarEvento = async(req, res = response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        //Buscar el evento por ID del evento y nos devuelve la informacion del evento
        const evento = await Evento.findById( eventoId );

        //Asegurarse que existe un ID
        if(!evento){
            res.status(404).json({
                ok:false,
                message:'Usuario no encontrado con ese ID'
            });
        }

        //Verificar que el ID del usuario que quiera editar el evento sea el mismo que creo el evento
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                message:'El usuario no cuenta con los permisos para editar este evento'
            });
        }

        //Informacion del nuevo evento
        const nuevoEvento = {
            ...req.body,
            user:uid   
        }

        //Actualizar el evento anterior
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new:true } );

        res.status(201).json({
            ok:true,
            message: 'Evento encontrado y acutlizado',
            evento:eventoActualizado
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message:'Hable con el administrador'
        });
    }
}


//**************************************************** Eliminar evento ***************************************************
const eliminarEvento = async(req, res = response) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventId );

        if(!evento){
            return res.status(404).json({
                ok:false,
                message:'Evento no encontrado con este ID'
            })
        }

        //Verificar que el ID del usuario que quiera editar el evento sea el mismo que creo el evento
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                message:'El usuario no cuenta con los permisos para editar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventId );

        res.status(200).json({
            ok:true,
            message: 'Elemento eliminado exitosamente'
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message:'Error, comuniquese con el administrador'
        })
    }

}

module.exports ={
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}