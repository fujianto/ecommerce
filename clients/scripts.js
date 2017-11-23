// Productions
// const apiEndpointRoot = "http://35.186.144.106";
// const apiEndpointRoot = "http://api.septianfujianto.com";
// const customerID = "5a14fe517f697714134e3bc4"
// Development
const customerID = "5a13c58c9919f65290e6ecac";
const apiEndpointRoot = "http://localhost:3000";

var app = new Vue({
  el: '#app',
  data: {
    developer: 'Septian Ahmad Fujianto',
    message: '',
    lastTransaction: '',
    products: [],
    carts: [],
    transactions: []
  },
  methods: {
    xdebug(data) {

      return data;
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

    findDuplicate(arr, input) {
      let cart = [];
      let isDuplicate = {
        duplicate: false,
        index: null,
        _id: null
      };

      arr.forEach(function(item, index) {
        if (item._id === input._id) {
          isDuplicate.duplicate = true;
          isDuplicate.index = index;
          isDuplicate._id = item._id;
        }
      });

      return isDuplicate;
    },

    getTotalCart() {
      let total = 0;

      this.carts.forEach(function(cart, index) {
        total += cart.price;
      });

      return total;
    },

    addToCart(product, event) {
      if (event) {
        event.preventDefault()
      }

      this.message = `1 buah "${product.name}" ditambahkan kedalam keranjang belanja`;
      this.lastTransaction = "";

      let cartProduct = {
        _id: null,
        name: null,
        category: null,
        createdAt: null,
        image: null,
        name: null,
        price: null,
        quantity: 0
      };

      let tempCart = this.findDuplicate(this.carts, product);

      if (tempCart.duplicate === true) {
        this.carts[tempCart.index].quantity += 1;
        this.carts[tempCart.index].price = this.carts[tempCart.index].price * this.carts[tempCart.index].quantity;

      } else {
        cartProduct._id = product._id;
        cartProduct.name = product.name;
        cartProduct.category = product.category;
        cartProduct.createdAt = product.createdAt;
        cartProduct.image = product.image;
        cartProduct.name = product.name;
        cartProduct.price = product.price;
        cartProduct.quantity += 1;

        this.carts.push(cartProduct);
      }
    },

    completePayment(carts) {
      if (carts.length > 0) {
          var order = {
            transaction: {
              customer: customerID,
              total: +this.getTotalCart(),
              productlist: [],
              transaction_date: new Date().toISOString()
            }
          };

          this.carts.forEach(function(cart, index) {
            order.transaction.productlist.push({
              productId: cart._id,
              name: cart.name,
              quantity: cart.quantity,
              subTotal: cart.price
            })
          });

          axios.post(`${apiEndpointRoot}/transactions`, order)
            .then(success => {
              this.carts = [];
              console.log('~~~success ', success)
              this.transactions.push(success.data.transaction);
              this.lastTransaction = success.data.message;
              // alert(success.data.message);

            }).catch(err => console.error(err.message));
      } else {
        // alert("Cart masih kosong");
        this.lastTransaction = "Cart masih kosong";
      }
    },

    clearLastTransaction() {
        this.lastTransaction = "";
    },

    createNewProduct() {
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
    }
  },
  created() {
    this.loadLatestProducts();
    this.loadLatestTransactions();

  }
})