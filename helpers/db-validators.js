
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
            throw new Error(`El id  ${id} NO existe`)
        }
    }


module.exports ={
    esRolValido,
    emailExiste,
    existeUsuarioById 
}