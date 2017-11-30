const router = require('express').Router();
const productController = require('../controllers/productController');

const multer  = require('multer')
const upload = multer({});
const fileUpload =  require('../helpers/fileUpload');

router.get('/', productController.findAll);
router.post('/', fileUpload.multer.single('image'), fileUpload.sendUploadToGCS, productController.create);
router.put('/:productId', fileUpload.multer.single('image'), fileUpload.sendUploadToGCS, productController.update);
router.delete('/:productId', productController.destroy);


module.exports = router;