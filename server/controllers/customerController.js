const CustomerModel = require('../models/customer');
const ObjectId = require('mongodb').ObjectID;

const findAll = (req, res) => {
	CustomerModel.find((err, customer) => {
		if (err) {
			res.status(500).send({message: err.message});
		}

		res.status(200).send(customer);
	});
}

const create = (req, res) => {
	let customer = new CustomerModel({
    name: req.body.name,
    address:   req.body.address,
    email: req.body.email,
    phone: req.body.phone
	});

	customer.save((err, createdCustomer) => {
		if (err) {
			res.status(500).send({message: err.message});
		} else {
			res.status(200).send({customer: createdCustomer, message: 'Customer Added'});
		}

  });
}

const update = (req, res) => {
	CustomerModel.findOneAndUpdate(
		{ _id : ObjectId(req.params.customerId) },
		{
			name: req.body.name || customer.name,
			address:   req.body.address || customer.address,
			email: req.body.email || customer.email,
			phone: req.body.phone || customer.phone
		}, {upsert:true},
		function(err, customer){
			if (err) {
				res.status(500).send({message: err.message});
			} else {
				res.status(200).send({customer: customer, message: 'Customer Updated'});
			}
		}
	);
}

const destroy = (req, res) => {
	CustomerModel.findByIdAndRemove(req.params.customerId, (err, customer) => {
		let response = {
			message : "Customer deleted",
			customer: customer
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