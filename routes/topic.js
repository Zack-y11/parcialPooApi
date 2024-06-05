const express = require('express');
const route = express.Router()
const Curso = require('../models/topicsData')
const fs = require('fs')

route.get('/', async (req, res) => {
    try{
        // API SHOULD RETURN 
        const cursos = await Curso.find();
        res.json(cursos)
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

route.post('/', async (req, res) => {
    const curso = new Curso({
        title: req.body.title,
        introduccion: req.body.introduccion,
        orden: req.body.orden,
        requisitos: req.body.requisitos,
        nombreMaterial: null,
        tipo: null,
        materialClase: req.body.materialClase,
        materialRecomendado: req.body.materialRecomendado
    });

    try{
        const newCurso = await curso.save();
        console.log('saved topic succesfully')
        res.status(201).json(newCurso)
    }catch(err){
        console.log('failed')
        res.status(400).json({message: err.message})
    }
})

route.get('/:id', getTopic,(req, res)=>{
    res.json(res.curso)
})

async function getTopic(req, res, next){
    let curso;
    try{
        curso = await Curso.findById(req.params.id)
        if(curso == null){
            return res.status(404).json({message: 'Cannot find topic'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.curso = curso
    next()
}

route.put('/:id', getTopic, async(req, res)=>{
    const allowedProperties = Object.keys(res.curso.schema.paths);
    const updatedProperties = Object.keys(req.body);

    for (const property of updatedProperties) {
        if (allowedProperties.includes(property)) {
            res.curso[property] = req.body[property];
        }
    }

    try{
        const updatedCurso = await res.curso.save();
        res.json(updatedCurso);
        console.log('Successfully updated');
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

route.delete('/:id', getTopic, async(req, res)=>{
    const id = req.params.id;
    try{
        const response = await 
        Curso.deleteOne({_id: id})
        res.send(response);
        console.log('Topic was deleted')
    }catch(err){
        res.status(500).json({message: err.message})
        console.log('Cannot delete this topic')
    }
        
})

module.exports = route