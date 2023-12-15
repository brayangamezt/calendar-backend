const {Schema, model} = require('mongoose');

//SCHEMA, es como una tabla, es decir la informacion que se va a guardar en la base de datos
const UsuarioSchema = Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password: {type:String, required:true}
});

module.exports = model('usuario', UsuarioSchema);