const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate que la ruta sea correcta

// Ruta Pública (Cualquiera puede ver la info)
router.get('/', infoController.getSiteInfo);

// Ruta Protegida (Solo admin puede editar)
// IMPORTANTE: Asegúrate de que 'updateSiteInfo' coincida con el nombre en el controlador
router.put('/', authMiddleware, infoController.updateSiteInfo);

module.exports = router;