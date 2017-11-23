const router = require('express').Router();
const productController = require('../controllers/productController');

const multer  = require('multer')
const upload = multer({});
const fileUpload =  require('../helpers/fileUpload');

router.get('/', productController.findAll);
router.post('/', productController.create);
router.put('/:productId', productController.update);
router.delete('/:productId', productController.destroy);

router.post('/test', fileUpload.multer.single('image'), fileUpload.sendUploadToGCS, productController.create)

module.exports = router;