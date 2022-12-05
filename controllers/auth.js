const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJSONWEB");
const { googleverify } = require("../helpers/google-verify");


const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario o password no es correcto',
            });
        }
        //verificar si el usuario esta activo en BD
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario o password no es correcto',
            });
        }

        //verificar la contraseña
        const validarPass = bcrypt.compareSync(password, usuario.password);

        if (!validarPass) {
            return res.status(400).json({
                msg: 'El usuario o password no es correcto -password',
            });
        }

        //Generar Json webToke jwt
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador',
        });
    }

}
const googleSing = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const {correo,nombre,img} = await googleverify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
           const data ={
                nombre,
                correo,
                password:':p', 
                img,
                google:true
           };

           usuario = new Usuario(data);
           await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                ok:false,
                msg:'Hable con el administrador, usuario bloqueado'  
          });
        }
        
        const token = await generarJWT(usuario.id);


        res.json({
           usuario,
           token
        });
    } catch (error) {
        res.status(400).json({
                  ok:false,
                  msg:'El token no se pudo verificar'  
            });
    }




}
module.exports = {
    login,
    googleSing
}