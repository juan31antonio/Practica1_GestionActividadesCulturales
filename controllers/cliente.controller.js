const Cliente = require('../models/cliente.model');
const Compra = require('../models/compra.model');

let ClienteController = {};

ClienteController.addCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        const clienteGuardado = await nuevoCliente.save();
        res.json(clienteGuardado);
    }
    catch (error) {
        res.status(500).json({error: 'Error al agregar cliente'});
    }
}

ClienteController.modCliente = async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente modificado correctamente', cliente: clienteActualizado });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al modificar cliente' });
    }
}

ClienteController.deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const compras = await Compra.find({ cliente: cliente._id }).populate('actividad', 'fecha');

        const fechaActual = new Date();
        const comprasFuturas = compras.filter(compra => compra.actividad.fecha > fechaActual);

        if (comprasFuturas.length > 0) {
            return res.status(400).json({ 
                error: 'El cliente tiene actividades futuras' 
            });
        }
        await Compra.deleteMany({ cliente: cliente._id });
        await Cliente.findByIdAndDelete(cliente._id);

        res.json({ mensaje: 'Cliente eliminado' });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar un cliente' });
    }
}

ClienteController.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } 
    catch (error) {
        res.status(500).json({error: 'Error al obtener los clientes'});
    }
}

ClienteController.getClienteDetalles = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id) ;
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const compras = await Compra.find({ cliente: cliente._id }).populate({
                path: 'actividad',
                populate: { path: 'proveedor', select: 'nombre' }
            });

        const comprasHechas = compras.map(compra => ({
            idActividad: compra.actividad._id,
            nombreActividad: compra.actividad.nombre,
            ubicacion: compra.actividad.ubicacion,
            nombreProveedor: compra.actividad.proveedor.nombre,
            fechaActividad: compra.actividad.fecha,
            fechaCompra: compra.fecha_compra
        }));

        const detallesDelCliente = {
            id: cliente._id,
            nombre: cliente.nombre,
            email: cliente.email,
            comprasHechas: comprasHechas
        }

        res.json(detallesDelCliente);
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al listar los detalles del cliente' });
    }
};

module.exports = ClienteController;