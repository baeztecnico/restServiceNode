
const { Categoria, Producto } = require('../models');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');


const esRolValido = async(rol ='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

    //verificar si el correo existe//
    const emailExiste =async(correo) =>{
        const existeMail  = await Usuario.findOne({correo});
        if(existeMail){
            throw new Error(`El Email  ${correo} ya existe`)
        }
    }

    const existeUsuarioById =async(id) =>{
        const existeUsuario  = await Usuario.findById(id);
        if(!existeUsuario){
            throw new Error(`El id de usuario  ${id} NO existe`)
        }
    }

    const existeCategoriaById =async(id) =>{
        const existeCategoria  = await Categoria.findById(id);
        if(!existeCategoria){
            throw new Error(`El id de categoria ${id} NO existe`)
        }
    }
    
    const existeProductoaById =async(id) =>{
        console.log('este puede ser el id del producto',id);

        const existeProducto  = await Producto.findById(id);
        if(!existeProducto){
            throw new Error(`El id de producto  ${id} NO existe`)
        }
    }
    //validar colecciones permitidas///
    const coleccionesPermitidas =(coleccion='',colecciones =[]) =>{
        const incluida =colecciones.includes(coleccion);
        if(!incluida){
            throw new Error(`La coleccion   ${coleccion} NO es permitida ${colecciones}`) 
        }
        return true;
    }
module.exports ={
    esRolValido,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoaById,
    coleccionesPermitidas
}