// const multer  = require('multer')
// const upload = multer({});const upload = multer({});
const ProductModel = require('../models/product');
const ObjectId = require('mongodb').ObjectID;

const findAll = (req, res) => {
	ProductModel.find((err, product) => {
		if (err) {
			res.status(500).send({message: err.message});
		}

		res.status(200).send(product);
	});
}

const create = (req, res) => {
	/*res.send({
		status: 200,
		message: 'Your file is successfully uploaded',
		link: req.file.cloudStoragePublicUrl,
		location: req.body.location
	})*/

	let product = new ProductModel({
		name:  req.body.name,
		image: req.file.cloudStoragePublicUrl,
		price:    +req.body.price,
		quantity:  +req.body.quantity,
		category:  req.body.category,
		createdAt: new Date()
	});

	product.save((err, createdProduct) => {
		if (err) {
			res.status(500).send({message: err.message});
		} else {
			 res.status(200).send({product: createdProduct, message: 'Product Added'});
		}
  });
}

const update = (req, res) => {
	ProductModel.findOne({ _id : ObjectId(req.params.productId) })
		.then(product => {
			if (product) {
				let productImage = typeof req.file  !== 'undefined' ? req.file.cloudStoragePublicUrl : product.image;

				product.name =  req.body.name || product.name;
				product.image = productImage;
				product.price =    +req.body.price || product.price;
				product.quantity =  +req.body.quantity || product.quantity;
				product.category =  req.body.category || product.category;

				product.save()
					.then(updatedProduct => {
						res.status(200).send({product: updatedProduct, message: 'Product Updated'});

					}).catch(err => res.status(500).send(err.message));
			}

		}).catch(err => res.status(500).send(err.message));
}

const destroy = (req, res) => {
	ProductModel.findByIdAndRemove(req.params.productId, (err, product) => {
		let response = {
			message : "Product deleted",
			product: product
		}

		if (err) {
			res.status(500).send({message: err.message});
		}

		 res.status(200).send(response);
	})
}

module.exports = {
	findAll,
	create,
	update,
	destroy
}