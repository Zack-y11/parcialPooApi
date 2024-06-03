const mongoose = require('mongoose');

const cursoData = new mongoose.Schema({
    title: String,
    introduccion: String,
    requisitos: Array,
    materialClase: String,
    materialRecomenadado: String,

})

const Curso = mongoose.model("temas", cursoData);

module.exports = Curso