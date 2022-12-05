const { response } = require("express");
const { Categoria } = require('../models');
const { populate } = require("../models/categoria");


const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(401).json({
            msg: 'La categoria ya existe'
        });
    }

    //generar la data a guardar 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response) => {
    const id = req.params.id;
    const {estado, usuario,...data}= req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario.id;
    const categoria = await Categoria.findByIdAndUpdate(id,data, {new:true});
    res.json({
        msg: 'categoria actualizada con exito',
        categoria
    });
}

const obtenerCategoriaById = async (req,res = response) => {
    const id = req.params.id;
    console.log('al menos sabemos el ID ',id);
    const categoria = await Categoria.findById(id)
    .populate('usuario','nombre');
    res.json({
        msg: 'esta es la categoria encontrada',
        categoria
    });
}

const obtenerCategorias = async (req, res =response) => {
    const query = req.query;
    const {limite = 5, desde = 0} = req.query;

    const [total,categorias] =await Promise.all([
      Categoria.countDocuments({estado: true}),
      Categoria.find({estado: true})
      .populate('usuario','nombre')
      .skip(Number(desde))
      .limit(limite),
    ]);
    res.json({
    total,
    categorias
    });
}

const borrarCategoria = async (req, res = response) => {
    const{id} = req.params;

    const uid = req.uid;

    const userAuth = req.usuario;
    // Borrar fisicamente///

    //const usuario = await Usuario.findByIdAndDelete(id);

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false},{new:true});
    res.json({
      userAuth,
      categoria,
      uid

    });
}
module.exports = {
    crearCategoria,
    actualizarCategoria,
    obtenerCategoriaById,
    obtenerCategorias,
    borrarCategoria
}