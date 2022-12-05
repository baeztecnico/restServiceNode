
const { Producto, Categoria } = require('../models');

const crearProducto = async (req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({nombre:body.nombre} );
    if (productoDB) {
        return res.status(401).json({
            msg: 'El producto ya existe'
        });
    }

    //generar la data a guardar 

    const data = {
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario: req.usuario._id

    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async (req, res = response) => {
    const id = req.params.id;
    const {estado, usuario,...data}= req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario.id;
    const producto = await Producto.findByIdAndUpdate(id,data, {new:true});
    res.json({
        msg: 'Producto actualizado con exito',
        producto
    });
}

const obtenerProductoById = async (req,res = response) => {
    const id = req.params.id;

    const producto = await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre')
    res.json({
        msg: 'Este es el producto encontrado',
        producto
    });
}

const obtenerProductos = async (req, res =response) => {
    const query = req.query;
    const {limite = 5, desde = 0} = req.query;

    const [total,productos] =await Promise.all([
      Producto.countDocuments({estado: true}),
      Producto.find({estado: true})
      .populate('usuario','nombre')
      .populate('categoria','nombre')
      .skip(Number(desde))
      .limit(limite),
    ]);
    res.json({
    total,
    productos
    });
}

const borrarProducto = async (req, res = response) => {
    const{id} = req.params;

    const uid = req.uid;

    const userAuth = req.usuario;
    // Borrar fisicamente///

    //const usuario = await Usuario.findByIdAndDelete(id);

    const producto = await Producto.findByIdAndUpdate(id, {estado:false},{new:true});
    res.json({
      userAuth,
      producto,
      uid

    });
}
module.exports = {
    crearProducto,
    actualizarProducto,
    obtenerProductoById,
    obtenerProductos,
    borrarProducto
}