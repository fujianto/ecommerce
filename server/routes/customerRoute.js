const router = require('express').Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.findAll);
router.post('/', customerController.create);
router.put('/:customerId', customerController.update);
router.delete('/:customerId', customerController.destroy);

module.exports = router;