const express = require('express');
const ClienteController = require('../controllers/cliente.controller');

const router = express.Router();

router.post('/', ClienteController.addCliente);
router.put('/:id', ClienteController.modCliente);
router.delete('/:id', ClienteController.deleteCliente);
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getClienteDetalles);

module.exports = router;