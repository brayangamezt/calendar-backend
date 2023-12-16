const express = require('express');
require('dotenv').config(); //Esto se importa para tener acceso a las variables de entorno
const { dbConnection } =require('./database/config');
const cors = require('cors');

//Crear el servidor de express 
const app = express();

//Conexion a base de datos
dbConnection();

//importacion de cors
app.use(cors());


//Directorio publico utilizando middleware USE. UN MIDDLEWARE es una funcion que se ejecuta cuando se hace una peticion a servidor
app.use( express.static( 'public' ) )

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto: ${process.env.PORT}`);
});

