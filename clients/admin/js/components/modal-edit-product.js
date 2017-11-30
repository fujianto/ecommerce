Vue.component('modal-edit-product', {
	template: `
		<div class="modal fade" id="editProductModal" tabindex="-1" role="dialog" aria-labelledby="editProductModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="editProductModalLabel">Edit Product</h4>
					</div>
					<div class="modal-body">
						<form action="#">
							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productName" ref="productName" name="productName" placeholder="Nama Produk" :value="item.name" />
							</div>

							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productPrice" ref="productPrice" name="productPrice" placeholder="Harga Produk" :value="item.price" />
							</div>

							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productQuantity" ref="productQuantity" name="productQuantity" placeholder="Jumlah Stok Produk" :value="item.quantity"/>
							</div>

							<div class="input-group u-full-width">
								<input class="form-control" type="text" id="productCategory" ref="productCategory" name="productCategory" placeholder="Kategori Produk" :value="item.category"/>
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
												<button class="btn btn-danger" @click="removeImage">Remove image</button>
										</div><!-- /.col-md-12 -->
									</div><!-- /.row -->
								</div>

							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button @click.prevent="editProduct()" type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Add Product</button>
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
		editProduct() {

			let product = {
				name: this.$refs.productName.value,
				price: this.$refs.productPrice.value,
				quantity: this.$refs.productQuantity.value,
				category: this.$refs.productCategory.value,
				image: this.uploadFile
			};

			this.$emit('editing-product', product);
		},

		onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);

      this.$emit('editing-product-image', files[0]);
    },

    createImage(file) {
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
})