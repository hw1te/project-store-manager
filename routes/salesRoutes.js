const { Router } = require('express');

const router = Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);

module.exports = router;
