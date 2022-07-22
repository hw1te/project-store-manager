const { Router } = require('express');

const router = Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale);

module.exports = router;
