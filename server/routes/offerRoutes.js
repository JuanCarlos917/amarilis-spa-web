const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', offerController.getAllOffers);
router.get('/active', offerController.getActiveOffers);
router.post('/', authMiddleware, offerController.createOffer);
router.put('/:id', authMiddleware, offerController.updateOffer);
router.delete('/:id', authMiddleware, offerController.deleteOffer);

module.exports = router;
