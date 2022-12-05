const { v4: uuidv4 } = require('uuid');
const path = require('path');



const subirArchivo = (files, extPermitidas = ['txt', 'apk', 'jpg', 'png'],carpeta ='') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];
        console.log(nombreCortado);


        //validar la extencion
        if (!extPermitidas.includes(extencion)) {
           return reject(`la extension  ${extencion} no es permitida ${extPermitidas}`);
        }
        const nombreTemporal = uuidv4() + '.' + extencion;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta,nombreTemporal);

        archivo.mv(uploadPath, function (err) {
            if (err) {
               reject(err);
            }

            resolve(nombreTemporal);
        });
    });
}

module.exports = {
    subirArchivo
}