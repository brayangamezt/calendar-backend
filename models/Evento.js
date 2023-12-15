const {Schema, model} = require('mongoose');

//SCHEMA, es como una tabla, es decir la informacion que se va a guardar en la base de datos
const EventoSchema = Schema({
    title:{ type: String, required:true },
    notes: { type: String },
    start: { type:Date, required:true },
    end: { type:Date, required:true },
    user:{ type: Schema.Types.ObjectId, ref: 'usuario', required:true }
});


//Explicado clase 396 curso react FH
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('evento', EventoSchema);