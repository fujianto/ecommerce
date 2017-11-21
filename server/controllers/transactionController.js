const TransactionModel = require('../models/transaction');
const ObjectId = require('mongodb').ObjectID;

/*const findTransaction = (req, res) => {
	TransactionModel.find().populate('booklist').populate('customer').exec()
		.then((datas) => {
				res.status(200).send(datas);
			}).catch(err => {
				res.status(500).send({message: err});
			})
}*/

const findAll = (req, res) => {
	TransactionModel.find({customer: ObjectId(req.body.customerId)}, (err, product) => {
		if (err) {
			res.status(500).send({message: err.message});
		}

		res.status(200).send(product);
	});
}

const create = (req, res) => {
	let dueDate = new Date();
	dueDate.setDate(dueDate.getDate() + +req.body.days)

	let transaction = new TransactionModel({
		customer: req.body.customerId,
		transaction_date: new Date(),
		productlist: req.body.productlist
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