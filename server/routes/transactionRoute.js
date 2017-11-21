const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.findAll);
router.post('/', transactionController.create);
router.put('/:transactionId', transactionController.update);
router.delete('/:transactionId', transactionController.destroy);

module.exports = router;