const apiEndpointRoot = "http://api.septianfujianto.com";
const customerID = localStorage.getItem('id');

// const apiEndpointRoot = "http://api.septianfujianto.com";
// const customerID = "5a14fe517f697714134e3bc4"


var app = new Vue({
	el: '#app',
	// State
	data: {
		uploadImage: '',
		products: [],
		users: [],
		transactions: [],
		editedProduct: {
			name : '',
			price : 0,
			quantity: 0,
			category: 0
		},
		editedProductIndex: 0,
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

		loadProducts() {
			axios.get(`${apiEndpointRoot}/products`)
			.then(products => {
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
          this.products.push(newProduct.data.product);

        }).catch(err => console.error(err));
		},

		modifyProduct(payload) {
			if (payload.action === 'delete') {
				axios.delete(`${apiEndpointRoot}/products/${payload.product._id}`)
				.then(product => {
          // Add it to products state
          alert("Product Berhasil Dihapus");

          this.products.splice(payload.index, 1);

        }).catch(err => console.error(err));
			}

			if (payload.action === 'edit') {
				 // Show Modal Edit
				 console.log("Editing index", payload.index, payload.product);
				 this.editedProduct = payload.product;
				 this.editedProductIndex = payload.index;
			}
		},

		editCurrentProduct(payload) {
			var formData = new FormData();
			formData.append('name', payload.name);
			formData.append('price',  payload.price);
			formData.append('quantity',  payload.quantity);
			formData.append('category',  payload.category);
			formData.append('image',  this.uploadImage);

      axios.put(`${apiEndpointRoot}/products/${this.editedProduct._id}`, formData)
      .then(newProduct => {
          // Add it to products state
          alert("Product Berhasil Di Edit");
          console.log(newProduct.data.product)
          this.products.splice(this.editedProductIndex, 1, newProduct.data.product);
          this.uploadImage = "";

        }).catch(err => console.error(err));
    },

    setUploadImage(payload) {
    	this.uploadImage = payload;
		},
		
		isLogin() {
			if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
				alert("Login dulu sebelum masuk Admin")
				window.location = "/"
			}
		}
	},

	created() {
		this.loadProducts();
		this.isLogin();
	}
})