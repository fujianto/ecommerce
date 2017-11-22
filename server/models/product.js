const mongoose = require('mongoose');
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