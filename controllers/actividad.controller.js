const Actividad = require('../models/actividad.model');
const Compra = require('../models/compra.model');

let ActividadController = {};

ActividadController.addActividad = async (req, res) => {
    try {
        const nuevaActividad = new Actividad(req.body);
        const actividadGuardada = await nuevaActividad.save();
        res.json(actividadGuardada);
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear actividad'});
    }
}

ActividadController.deleteActividad = async (req, res) => {
    try {
        const actividadEliminada = await Actividad.findByIdAndDelete(req.params.id);
        if (!actividadEliminada) {
            return res.status(404).json({error: 'Actividad no encontrada'});
        }
        res.json({mensaje: 'Actividad eliminada'});
    }
    catch (error) {
        res.status(500).json({error: 'Error al eliminar una actividad'});
    }
}

ActividadController.listarActividadesFuturas = async (req, res) => {
    try {
        const fechaActual = new Date();
        const actividadesFuturas = await Actividad.find().where('fecha').gt(fechaActual).populate('proveedor', 'nombre');
        res.json(actividadesFuturas);
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al listar actividades futuras' });
    }
};

ActividadController.getActividadDetalles = async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id).populate('proveedor', 'nombre');
        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        const compras = await Compra.find({ actividad: actividad._id }).populate('cliente', 'nombre email');

        const clientes = compras.map(compra => ({
            id: compra.cliente._id,
            nombre: compra.cliente.nombre,
            email: compra.cliente.email,
            fecha_compra: compra.fecha_compra
        }));

        const detalles = {
            id: actividad._id,
            nombre: actividad.nombre,
            fecha: actividad.fecha,
            ubicacion: actividad.ubicacion,
            plazasDisponibles: actividad.plazas_disponibles,
            proveedorNombre: actividad.proveedor.nombre,
            clientes: clientes
        };

        res.json(detalles);
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al listar actividades futuras' });
    }
};

module.exports = ActividadController;