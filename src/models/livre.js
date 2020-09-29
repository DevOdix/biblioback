const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const livreSchema = new Schema({
    ident : {type: String, required: true ,unique : true} ,
    nomLivre : {type: String, required: true ,unique : true} ,
    descriptionLivre : {type: String, required : true}
   // image : {type: String, required : true}
});

livreSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Livre', livreSchema);