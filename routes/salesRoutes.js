const { Router } = require('express');

const router = Router();
const salesController = require('../controllers/salesController');

router.post('/', salesController.createSale);
// router.post('/', salesController.getAll);
// router.post('/:id', salesController.getById);

module.exports = router;
