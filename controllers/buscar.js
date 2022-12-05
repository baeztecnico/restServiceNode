const { response } = require("express");
const { ObjectId, isValidObjectId } = require("mongoose");
const { Usuario,Categoria, Producto } = require('../models');


const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino ='',res =response)=>{

    const esMongoID = isValidObjectId(termino); 

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:[]
        });
    }

    const regexp =  new RegExp(termino,'i');
    const usuarios = await Usuario.find({
        $or:[{nombre:regexp},{correo:regexp}],
        $and:[{estado:true}]
    });
    return res.json({
        results:usuarios
    });
}
const buscarCategorias = async(termino ='',res =response)=>{

    const esMongoID = isValidObjectId(termino); 

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        });
    }

    const regexp =  new RegExp(termino,'i');
    const categoria = await Categoria.find({
        $or:[{nombre:regexp}],
        $and:[{estado:true}]
    });
    return res.json({
        results:categoria
    });
}

const buscarProductos = async(termino ='',res =response)=>{

    const esMongoID = isValidObjectId(termino); 

    if(esMongoID){
        const producto = await Producto.findById(termino);
        return res.json({
            results:(producto)?[producto]:[]
        });
    }

    const regexp =  new RegExp(termino,'i');
    const producto = await Producto.find({
        $or:[{nombre:regexp}],
        $and:[{estado:true}]
    });
    return res.json({
        results:producto
    });
}
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categoria':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        default:
            res.status(500).json({
                msg: `Se me olvido hacer esta busqueda`
            });
            break;
    }
  
}

module.exports = {
    buscar
}