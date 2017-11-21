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
	let product = new ProductModel({
		name:  req.body.name,
		image: req.body.image,
		price:    +req.body.price,
		quantity:  +req.body.quantity,
		category:  req.body.category,
		createdAt: new Date()
	});

	product.save((err, createdProduct) => {
		if (err) {
			res.status(500).send({message: err.message});
		}

    res.status(200).send({product: createdProduct, message: 'Product Added'});
  });
}

const update = (req, res) => {
	ProductModel.findOneAndUpdate(
		{ _id : ObjectId(req.params.productId) },
		{
			name:  req.body.name || product.name,
			image: req.body.image || product.image,
			price:    +req.body.price || product.price,
			quantity:  +req.body.quantity || product.quantity,
			category:  req.body.category || product.category,
		}, {upsert:true},
		function(err, product){
			if (err) {
				res.status(500).send({message: err.message});
			} else {
				res.status(200).send({product: product, message: 'Product Updated'});
			}
		}
	);
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