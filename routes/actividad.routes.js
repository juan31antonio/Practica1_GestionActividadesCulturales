const express = require('express');
const ActividadController = require('../controllers/actividad.controller');

const router = express.Router();

router.post('/', ActividadController.addActividad);
router.delete('/:id', ActividadController.deleteActividad);
router.get('/future', ActividadController.listarActividadesFuturas);
router.get('/:id', ActividadController.getActividadDetalles);

module.exports = router;