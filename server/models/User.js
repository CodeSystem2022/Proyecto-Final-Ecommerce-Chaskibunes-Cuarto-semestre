/* eslint-disable no-undef */
const {model, Schema} = require("mongoose");
const mongoose = require("mongoose");


const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco al principio y al final
  },
  email: {
    type: String,
    required: true,
    unique: true, // El correo electrónico debe ser único en la base de datos
    trim: true,
    lowercase: true, // Guardar el correo electrónico en minúsculas
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Usuario", UsuarioSchema);