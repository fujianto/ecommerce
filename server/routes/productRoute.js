const router = require('express').Router();
const productController = require('../controllers/productController');

const multer  = require('multer')
const upload = multer({});
const fileUpload =  require('../helpers/fileUpload');

router.get('/', productController.findAll);
router.post('/', fileUpload.multer.single('image'), fileUpload.sendUploadToGCS, productController.create);
router.put('/:productId', productController.update);
router.delete('/:productId', productController.destroy);

router.post('/test', fileUpload.multer.single('image'), (req, res) => {
	res.send({name:req.body.name, category: req.body.category, data: req.file})
});


module.exports = router;