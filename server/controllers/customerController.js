const CustomerModel = require('../models/customer');
const ObjectId = require('mongodb').ObjectID;
const Helper = require('../helpers/helper');

const findByUsername = (username) => {
	return new Promise((resolve, reject) => {
		CustomerModel.findOne({ username: username })
			.then(user => {
				resolve(user);
			}).catch(err => reject(err.message));
	});
}

const findAll = (req, res) => {
	CustomerModel.find((err, customer) => {
		if (err) {
			res.status(500).send({message: err.message});
		}

		res.status(200).send(customer);
	});
}

const create = (req, res) => {
	if (typeof req.body.password !== "undefined" && req.body.password !== null) {
		let customer = new CustomerModel({
			username: req.body.username,
			name: req.body.name,
			address: req.body.address,
			email: req.body.email,
			phone: req.body.phone
		});

		Helper.getHashedPassword(req.body.password)
			.then(password => {
				customer.password = password;
				customer.save((err, createdCustomer) => {
					if (err) {
						res.status(500).send({ message: err.message });
					} else {
						res.status(200).send({ message: "Customer added", customer: createdCustomer });
					}
				})

			}).catch(err => res.status(500).send({ message: err.message }));
	} else {
		res.status(500).send({ message: "Password must be filled" })
	}
}

const update = (req, res) => {
	CustomerModel.findOneAndUpdate(
		{ _id : ObjectId(req.params.customerId) },
		{
			username: req.body.username || customer.username,
			password: req.body.password || customer.password,
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

const signIn = (req, res) => {
	res.send(
		{
			id: req.header._id,
			token: req.header.token,
			email: req.header.email,
			name: req.header.full_name
		}
	)
}

module.exports = {
	findAll,
	create,
	update,
	destroy,
	findByUsername,
	signIn
}