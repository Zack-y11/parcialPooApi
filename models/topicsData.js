const mongoose = require('mongoose');

const cursoData = new mongoose.Schema({
    title: String,
    introduccion: String,
    requisitos: Array,
    nombreMaterial: String,
    tipo: String,
    materialClase: Array, 
    materialRecomenadado: String,

})

const Curso = mongoose.model("temas", cursoData);

module.exports = Curso