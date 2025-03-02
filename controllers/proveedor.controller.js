const Proveedor = require('../models/proveedor.model');
const Actividad = require('../models/actividad.model');

let ProveedorController = {};

ProveedorController.addProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        const proveedorGuardado = await nuevoProveedor.save();
        res.json(proveedorGuardado);
    }
    catch (error) {
        res.status(500).json({error: 'Error al agregar proveedor'});
    }
}

ProveedorController.modProveedor = async (req, res) => {
    try {
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedorActualizado) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({ mensaje: 'Proveedor modificado correctamente', proveedor: proveedorActualizado });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al modificar proveedor' });
    }
}

ProveedorController.deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        const actividades = await Actividad.find({ proveedor: proveedor._id });
        const fechaActual = new Date();

        const actividadesFuturas = actividades.filter(actividad => actividad.fecha > fechaActual);
        if (actividadesFuturas.length > 0) {
            return res.status(400).json({ error: 'El proveedor tiene actividades futuras por realizar y por tanto no se puede eliminar' });
        }

        await Actividad.deleteMany({ proveedor: proveedor._id });
        await Proveedor.findByIdAndDelete(proveedor._id);
        res.json({ mensaje: 'Proveedor eliminado' });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
}

ProveedorController.getProveedorDetalles = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        const actividades = await Actividad.find({ proveedor: proveedor._id })
        
        const actividadesCreadas = actividades.map(actividad => ({
            idActividad: actividad._id,
            nombreActividad: actividad.nombre,
            fechaActividad: compra.actividad.fecha,
            ubicacion: actividad.ubicacion,
            plazasDisponibles: actividad.plazas_disponibles
        }));

        const detallesDelProveedor = {
            id: proveedor._id,
            nombre: proveedor.nombre,
            email: proveedor.email,
            cif: proveedor.cif,
            actividadesCreadas: actividadesCreadas
        }

        res.json(detallesDelProveedor);
        
    } 
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
}

module.exports = ProveedorController;