 const {response} = require('express');
 const bcrypt = require('bcryptjs');
 const Usuario = require('../models/usuario');

 const usuariosGet =async(req, res = response) =>{
    const query = req.query;
    const {limite = 5, desde = 0} = req.query;

    const [total,usuarios] =await Promise.all([
      Usuario.countDocuments({estado: true}),
      Usuario.find({estado: true})
      .skip(Number(desde))
      .limit(limite),
    ]);
    res.json({
    total,
    usuarios
    });
  }

  const usuariosPut =async(req, res = response) =>{

    const id = req.params.id;
    const {_id,password,google,...resto}= req.body;

    if(password){
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg: 'put API - controlador',
        usuario
    });
  } 
  const usuariosPost =async(req, res = response) =>{
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
   
    //encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);


    await usuario.save();
    res.json({
        usuario
    });
  } 
  const usuariosDelete =async(req, res = response) =>{

    const{id} = req.params;

    // Borrar fisicamente///

    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
      usuario
    });
  } 
  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
  }