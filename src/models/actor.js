const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const actorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  roleadmin: { type : Boolean , default:false},
  image : { type : String}
});

actorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Actor', actorSchema);