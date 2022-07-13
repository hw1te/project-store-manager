const express = require('express');

const productController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router; 