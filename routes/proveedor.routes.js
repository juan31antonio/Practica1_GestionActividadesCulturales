const express = require('express');
const ProveedorController = require('../controllers/proveedor.controller');

const router = express.Router();

router.post('/', ProveedorController.addProveedor);
router.put('/:id', ProveedorController.modProveedor);
router.delete('/:id', ProveedorController.deleteProveedor);
router.get('/:id', ProveedorController.getProveedorDetalles);

module.exports = router;