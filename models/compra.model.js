const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema(
  {
    cliente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente', 
        required: true 
      },
      actividad: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Actividad', 
        required: true 
      },
      fecha_compra: { 
        type: Date, 
        default: Date.now 
      }
  },
);

module.exports = mongoose.model('Compra', compraSchema);