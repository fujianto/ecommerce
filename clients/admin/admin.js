const apiEndpointRoot = "http://api.septianfujianto.com";
const customerID = "5a14fe517f697714134e3bc4"


var app = new Vue({
	el: '#app',
	// State
	data: {
		products: [],
		users: [],
		transactions: []
	},
	// Methods
	methods: {
		getHumanDate(date) {
			return new Date(date).toString()
		},

		formatRupiah (angka) {
			var number_string = angka.toString(),
			sisa    = number_string.length % 3,
			rupiah  = number_string.substr(0, sisa),
			ribuan  = number_string.substr(sisa).match(/\d{3}/g);

			if (ribuan) {
				separator = sisa ? '.' : '';
				rupiah += separator + ribuan.join('.');
			}

			return rupiah;
		},


		loadLatestTransactions() {
			axios.get(`${apiEndpointRoot}/transactions`, {
				headers: {
					'customerId': customerID
				}
			})
			.then(transactions => {
				this.transactions = transactions.data

			}).catch(err => console.error(err.message));
		},

		loadLatestProducts() {
			axios.get(`${apiEndpointRoot}/products`)
			.then(products => {
				this.products = products.data

			}).catch(err => console.error(err.message));
		},

		createNewProduct() {
			console.log('~~~~~~~~~~ Create New Product')
			let productName = this.$refs.productName.value;
			let productPrice = this.$refs.productPrice.value;
			let productQuantity = this.$refs.productQuantity.value;
			let productCategory = this.$refs.productCategory.value;
			let productImage = this.$refs.productImage.value;

			let data = {
				name: productName,
				price: productPrice,
				quantity: productQuantity,
				category: productCategory,
				image: productImage
			};

			axios.post(`${apiEndpointRoot}/products`, data)
			.then(newProduct => {
          // Add it to products state
          alert("Product Berhasil Ditambahkan");
          console.log(newProduct.data);
          this.products.push(newProduct.data.product);

        }).catch(err => console.error(err));
		},
	}
})