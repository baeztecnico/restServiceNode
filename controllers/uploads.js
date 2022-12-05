const { execFileSync } = require("child_process");
const { response } = require("express");
const fs = require("fs");
const { arch } = require("os");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
const path = require('path');
const cloudinary = require('cloudinary').v2;
const cargarArchivos = async (req, res = response) => {

  cloudinary.config(process.env.CLOUDINARY_URL);
  try {
    //const pathArchivo = await subirArchivo(req.files,['txt','jpg'],'textos');
    const pathArchivo = await subirArchivo(req.files, undefined, 'imgs');

    res.json({
      path: pathArchivo
    });
  } catch (error) {
    res.status(400).json({ msg: 'Algo salio mal !!!:(' });
  }


}

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  //limpiar imagenes previas 

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el Id ${id}`
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el Id ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: 'se me olvido la coleccion'
      });
  }

  try {
    console.log('esta es la imagen de bD', modelo.img);

    if (modelo.img) {
      //Hay que borrar la imagen del servidor 
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      console.log('esta es la imagen ', pathImagen);
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
  } catch (error) {
    console.log('este es el error ', error);
  }
  const pathArchivo = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = pathArchivo;
  await modelo.save();
  res.json({
    modelo
  });
}


const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  //limpiar imagenes previas 

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el Id ${id}`
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el Id ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: 'se me olvido la coleccion'
      });
  }

  try {
    console.log('esta es la imagen de bD', modelo.img);

    if (modelo.img) {
      //Hay que borrar la imagen del servidor 
      const nomArr = modelo.img.split('/');
      const nombre = nomArr[nomArr.length -1];
      const [public_id] = nombre.split('.');
       cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    console.log('este es el error ', error);
  }
  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  // const pathArchivo = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = secure_url;
  await modelo.save();
  res.json({
    modelo
  });
}
const obtenerImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  //limpiar imagenes previas 

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el Id ${id}`
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el Id ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: 'se me olvido la coleccion'
      });
  }

  try {
    console.log('esta es la imagen de bD', modelo.img);

    if (modelo.img) {
      //Hay que borrar la imagen del servidor 
      //const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      //console.log('esta es la imagen ', pathImagen);
      //if (fs.existsSync(pathImagen)) {
        return res.json(modelo.img);
      //}
    }
  } catch (error) {
    console.log('este es el error ', error);
  }

  const pathImagen = path.join(__dirname, '../assets', 'no-image.jpg');
  return res.sendFile(pathImagen);

}
module.exports = {
  cargarArchivos,
  actualizarImagen,
  obtenerImagen,
  actualizarImagenCloudinary
}