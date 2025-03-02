const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true },
    ubicacion: { type: String, required: true },
    plazas_disponibles: { type: Number, required: true },
    proveedor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Proveedor',
        required: true 
    }
  },
);

module.exports = mongoose.model('Actividad', actividadSchema);