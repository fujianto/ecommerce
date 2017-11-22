// const url = 'mongodb://localhost:27017/ecommerce';
const url = 'mongodb://admin:admin@mongocrud-shard-00-00-ilsdt.mongodb.net:27017,mongocrud-shard-00-01-ilsdt.mongodb.net:27017,mongocrud-shard-00-02-ilsdt.mongodb.net:27017/ecommerce_db?ssl=true&replicaSet=mongoCrud-shard-0&authSource=admin';

const mongoose = require('mongoose').connect(url);
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'Customer'
	},
	transaction_date: { type: Date, default: Date.now },
	productlist: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: 'Product'
			},
			name: {
				type: String,
			},
			quantity: {
				type: Number,
			},
			subTotal: {
				type: Number,
			}
		}
	],
	total: Number
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = TransactionModel;