const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cif: { type: String, required: true, unique: true }
  },
);

module.exports = mongoose.model('Proveedor', proveedorSchema);