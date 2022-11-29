const { response } = require("express")



const isAdminRol = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el rol sin validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(500).json({
            msg: `${nombre} No es un administrador`
        });
    }
    next();
}


const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar el rol sin validar el token'
            });
        }
        console.log(roles, req.usuario.rol)  ;  
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles} `
            });
        }

        next();
    }
}
module.exports = {
    isAdminRol,
    tieneRol
}