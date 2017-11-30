Vue.component('modal-product', {
	template: `
		<div class="modal fade" id="newProductModal" tabindex="-1" role="dialog" aria-labelledby="newProductModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="newProductModalLabel">New Product</h4>
					</div>
					<div class="modal-body">
						<form action="#" v-on:submit="createNewProduct()">
							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productName" ref="productName" name="productName" placeholder="Nama Produk" />
							</div>

							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productPrice" ref="productPrice" name="productPrice" placeholder="Harga Produk" />
							</div>

							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productQuantity" ref="productQuantity" name="productQuantity" placeholder="Jumlah Stok Produk" />
							</div>

							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productCategory" ref="productCategory" name="productCategory" placeholder="Kategori Produk" />
							</div>

							<div class="input-group u-full-width">
								<div v-if="!uploadImage">
									<label>Pilih gambar</label>
									<input type="file" @change="onFileChange">
								</div>

								<div v-else>
									<div class="row">
										<div class="col-md-12">
											<img clas="small-thumbnai" :src="uploadImage" />
										</div><!-- /.col-md-12 -->

										<div class="col-md-12">
												<button class="btn btn-danger" @click.prevent="removeImage">Remove image</button>
										</div><!-- /.col-md-12 -->
									</div><!-- /.row -->
								</div>

							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button @click.prevent="newProduct()" type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Add Product</button>
						<!-- <input type="submit" class="btn btn-primary" value="Add Product" /> -->
					</div>
				</div>
			</div>
		</div>
	`,
	props: ['item'],
	data() {
		return {
			uploadImage : '',
			uploadFile: '',
			product : ''
		}
	},
	methods: {
		newProduct() {

			let product = {
				name: this.$refs.productName.value,
				price: this.$refs.productPrice.value,
				quantity: this.$refs.productQuantity.value,
				category: this.$refs.productCategory.value,
				image: this.uploadFile
			};

			this.$emit('create-new-product', product);
		},

		onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },

    createImage(file) {
      console.log('~~~~ Image ini file', file);
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

     reader.onload = (e) => {
        vm.uploadImage = e.target.result;
      };

      reader.readAsDataURL(file);
      this.uploadFile = file;
    },

    removeImage: function (e) {
      this.uploadImage = '';
    }

	},
	created() {
		console.log('~~~~~~~~~~created')
		// this.product = this.item;
	},
	mounted() {
		console.log('~~~~~~~~~~MOUNTED')
		console.log(this)
		// this.product = this.item;
	}
})