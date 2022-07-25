const { Router } = require('express');

const router = Router();
const productsController = require('../controllers/productsController');

router.post('/', productsController.create);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
