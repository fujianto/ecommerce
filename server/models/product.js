const url = 'mongodb://localhost:27017/ecommerce';
const mongoose = require('mongoose').connect(url);
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name:  String,
	price:   Number,
	image:   String,
	quantity: Number,
	category: String,
	createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;