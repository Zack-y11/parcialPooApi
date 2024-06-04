const mongoose = require('mongoose');


const cursoData = new mongoose.Schema({
    title: String,
    introduccion: String,
    requisitos: Array, // array de links a otros nodos
    materialRecomendado: Array,
    nombreMaterial: String,
    tipo: String,
    orden: Number,
    materialClase: Array, 
})

const Curso = mongoose.model("temas", cursoData);

module.exports = Curso