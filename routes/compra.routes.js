const express = require('express');
const CompraController = require('../controllers/compra.controller');

const router = express.Router();

router.post('/', CompraController.addCompra);
router.delete('/', CompraController.deleteCompra);

module.exports = router;