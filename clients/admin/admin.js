const apiEndpointRoot = "http://localhost:3000";
const customerID = "5a14fe517f697714134e3bc4"


var app = new Vue({
	el: '#app',
	// State
	data: {
		uploadImage: '',
		products: [],
		users: [],
		transactions: []
	},
	components : {
		// product-row
	},
	// Methods
	methods: {
		testMethod() {
			alert("Test Method Called");
		},

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

		loadTransactions() {
			axios.get(`${apiEndpointRoot}/transactions`, {
				headers: {
					'customerId': customerID
				}
			})
			.then(transactions => {
				this.transactions = transactions.data

			}).catch(err => console.error(err.message));
		},

		loadProducts() {
			axios.get(`${apiEndpointRoot}/products`)
			.then(products => {
				console.log('~~~~~~~~Latest Product ', products);
				this.products = products.data

			}).catch(err => console.error(err));
		},

		createNewProduct(payload) {
			var formData = new FormData();
			formData.append('name', payload.name);
			formData.append('price',  payload.price);
			formData.append('quantity',  payload.quantity);
			formData.append('category',  payload.category);
			formData.append('image',  payload.image);

			axios.post(`${apiEndpointRoot}/products`, formData)
			.then(newProduct => {
          // Add it to products state
          alert("Product Berhasil Ditambahkan");
          console.log(newProduct.data);
          this.products.push(newProduct.data.product);

        }).catch(err => console.error(err));
		},

		modifyProduct(payload) {
			console.log(payload);

			axios.delete(`${apiEndpointRoot}/products/${payload.product._id}`)
			.then(product => {
          // Add it to products state
          alert("Product Berhasil Dihapus");

          console.log(product.data);
          this.products.splice(payload.index, 1);

        }).catch(err => console.error(err));
		}
	},


	created() {
		this.loadProducts();
		this.loadTransactions();
	}
})