const TransactionModel = require('../models/transaction');
const ObjectId = require('mongodb').ObjectID;
const customerID = "5a13c58c9919f65290e6ecac";

const findAll = (req, res) => {
	/*TransactionModel.find({customer: ObjectId(req.header('customerId'))}, (err, product) => {
		if (err) {
			res.status(500).send({message: err.message});
		}

		res.status(200).send(product);
	});*/

		TransactionModel.find({customer: ObjectId(req.header('customerId'))})
		.populate('customer').populate(
			{
				path: 'productlist.productId',
				model: 'Product'
			}
		).exec()
		.then((product) => {
				res.status(200).send(product);
			}).catch(err => {
				res.status(500).send({message: err});
			})
}

const create = (req, res) => {
	let reqTransaction = req.body.transaction;

	let transaction = new TransactionModel({
		customer: reqTransaction.customer,
		transaction_date: new Date(),
		productlist: reqTransaction.productlist,
		total: reqTransaction.total
	});

	transaction.save((err, createdTransaction) => {
		if (err) {
			res.status(500).send({message: err.message});
		} else {
			res.status(200).send({transaction: createdTransaction, message: 'Transaction Added'});
		}
  });
}

const update = (req, res) => {
	TransactionModel.findById(req.params.transactionId, function(err, transaction) {
			if (err) {
				res.status(500).send({message: err.message});
			} else {

				transaction.customer = req.body.customerId || transaction.customer;
				transaction.transaction_date = new Date() || transaction.transaction_date;
				transaction.productlist = req.body.productlist || transaction.productlist;

				transaction.save((err, transactionUpdated) => {
					if (err) {
						res.status(500).send({message: err.message});
					} else {
						res.status(200).send({transaction: transactionUpdated, message: 'Transaction Updated'});
					}
				})
			}
	})
}

const destroy = (req, res) => {
	TransactionModel.findByIdAndRemove(req.params.transactionId, (err, transaction) => {
		let response = {
			message : "Transaction deleted",
			transaction: transaction
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