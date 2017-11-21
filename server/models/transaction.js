const url = 'mongodb://localhost:27017/ecommerce';
const mongoose = require('mongoose').connect(url);
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	customer: Schema.Types.ObjectId,
	transaction_date: { type: Date, default: Date.now },
	productlist: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}
	],
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = TransactionModel;