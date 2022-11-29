const { response } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');



const validarJWT =async(req, res = response,next)=>{
    const token = req.header('x-token');
    console.log(token);
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPROVATEKEY);
            req.uid = uid;
            req.usuario = await usuario.findById(uid);

            //verificar si UId esta en estado true

            if(! req.usuario.estado){
                return res.status(401).json({
                    msg:'Usuario no autorizado'
                })
            }
        next();  
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'Token no valido'
        })
    }
}

module.exports={
    validarJWT  
}