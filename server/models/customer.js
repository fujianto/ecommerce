const url = 'mongodb://localhost:27017/ecommerce';
const mongoose = require('mongoose').connect(url);
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	name: String,
	address:   String,
	email: String,
	phone: String,
});

const CustomerModel = mongoose.model('Customer', customerSchema);
module.exports = CustomerModel;