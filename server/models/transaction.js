const url = 'mongodb://localhost:27017/ecommerce';
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