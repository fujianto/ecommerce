/*var arr = [
{
	_id: "5a13c493bfef0650d9ef3d39",
	name: "Voucher Amazon $60",
	image: "amazon.jpg",
	price: 700000,
	quantity: 1,
	category: "Amazon",
	createdAt: "2017-11-21T06:15:47.694Z"
},
{
	_id: "5a13c4c1bfef0650d9ef3d3b",
	name: "Voucher Xbox Live $50",
	image: "xboxlive.jpg",
	price: 700000,
	quantity: 1,
	category: "Xbox Live",
	createdAt: "2017-11-21T06:16:33.440Z"
}
];

var input = {
	_id: "5a13c493bfef0650d9ef3d39",
	name: "Voucher Amazon $60",
	image: "amazon.jpg",
	price: 700000,
	quantity: 3,
	category: "Amazon",
	createdAt: "2017-11-21T06:15:47.694Z"
}

function addProductToCart(arr, input) {
	let cart = [];

	arr.forEach( function(item, index) {
		if (item._id !== input._id) {
			cart.push(item)
		} else {
			item.quantity += 1;
			cart.push(item);
		}
	});

	return cart;
}

function findDuplicate(arr, input) {
	let cart = [];
	let isDuplicate = {
		duplicate: false,
		index: null,
		_id : null
	};

	arr.forEach( function(item, index) {
		if (item._id === input._id) {
			isDuplicate.duplicate = true;
			isDuplicate.index = index;
			isDuplicate._id = item._id;
		}
	});

	return isDuplicate;
}

if (findDuplicate(arr, input).duplicate === true) {
	arr[findDuplicate(arr, input).index].quantity += 1
} else {
	arr.push(input);
}

console.log(arr)*/

var order = {
	transaction: {
		customer: "5a13c59f9919f65290e6ecad",
		total: 450000,
		productlist: [

		]
	}
};

order.transaction.productlist.push({id: 1, name: "Cat"})
order.transaction.productlist.push({id: 2, name: "Dog"})
console.log(order.transaction);