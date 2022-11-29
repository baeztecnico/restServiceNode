    const jwt = require('jsonwebtoken');



    const generarJWT = (uid ='') =>{
        return new Promise((resolve,reject)=>{
            const payLoad = {
                uid
            };
            jwt.sign(payLoad,process.env.SECRETORPROVATEKEY,{
                expiresIn:'1h'
            },(err,token)=>{
                if(err){
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            })
        })
    }

    module.exports={
        generarJWT
    }