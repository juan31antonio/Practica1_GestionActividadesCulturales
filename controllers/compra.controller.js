const Compra = require('../models/compra.model');
const Actividad = require('../models/actividad.model');

let CompraController = {};

CompraController.addCompra = async (req, res) => {
    try {
        const body = req.body;
        const actividad = await Actividad.findById(body.actividadId);
        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }
        
        const fechaActual = new Date();
        if (actividad.fecha <= fechaActual) {
            return res.status(400).json({ error: 'No se puede comprar la actividad porque es antigua' });
        }

        if (actividad.plazas_disponibles <= 0) {
            return res.status(400).json({ error: 'No hay plazas disponibles para la actividad' });
        }
        
        const nuevaCompra = new Compra({
            actividad: body.actividadId,
            cliente: body.clienteId
        });

        await nuevaCompra.save();
        actividad.plazas_disponibles -= 1;
        await actividad.save();
        
        return res.json({ message: 'Compra realizada', compra: nuevaCompra });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al hacer la compra' });
    }
}

CompraController.deleteCompra = async (req, res) => {
    try {
        const body = req.body;
        const compra = await Compra.find({ actividad: body.actividadId, cliente: body.clienteId });
        if (!compra) {
            return res.status(404).json({ error: 'Compra no encontrada' });
        }
        
        const actividad = await Actividad.findById(body.actividadId);
        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }
        
        const fechaActual = new Date();
        if (actividad.fecha <= fechaActual) {
            return res.status(400).json({ error: 'No se puede cancelar la compra porque la actividad ya se ha hecho' });
        }
        
        await Compra.findByIdAndDelete(compra._id);
        actividad.plazas_disponibles += 1;
        await actividad.save();
        
        return res.json({ message: 'Compra cancelada' });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al cancelar la compra' });
    }
}


module.exports = CompraController;