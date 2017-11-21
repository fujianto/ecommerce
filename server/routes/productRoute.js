const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.findAll);
router.post('/', productController.create);
router.put('/:productId', productController.update);
router.delete('/:productId', productController.destroy);

module.exports = router;