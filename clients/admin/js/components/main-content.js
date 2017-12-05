Vue.component('main-content', {
	template: `
	<main class="wrap">
		<div class="container">
			<div class="row col-md-12">
				<div>
					<!-- Nav tabs -->
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation"><a href="#customer" aria-controls="customer" role="tab" data-toggle="tab">Customer</a></li>
						<li role="presentation" class="active"><a href="#product" aria-controls="active product" role="tab" data-toggle="tab">Product</a></li>
					</ul>

					<!-- Tab panes -->
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane" id="customer">
							<h2 class="admin-heading-title">Customer Area</h2>

							<div class="table-wrapper">
								<table class="table">
									<thead>
										<tr>
											<th>ID</th>
											<th>Username</th>
											<th>Email</th>
											<th>Address</th>
											<th>Phone Number</th>
										</tr>
									</thead>

									<tbody>

									</tbody>
								</table>
								<!-- /.table -->
							</div><!-- /.table-wrapper -->
						</div>
						<div role="tabpanel" class="tab-pane active" id="product">
							<h2 class="admin-heading-title">Product Area 		<a href="#" style="margin-left:2rem;" class="btn btn-info btn-new-product" data-toggle="modal" data-target="#newProductModal"><i class="fa fa-plus-circle"></i> Tambah Produk baru</a></h2>

							<div class="table-wrapper">
								<table class="table">
									<thead>
										<tr>
											<th>ID</th>
											<th>Gambar</th>
											<th>Nama Produk</th>
											<th>Harga</th>
											<th>Stock</th>
											<th>Kategori</th>
											<th>Action</th>
										</tr>
									</thead>

									<tbody>
										<product-row @single-product-modified="productModified" :item="product" :key="index" :index="index" v-for="(product, index) in products"></product-row>
									</tbody>
								</table>
								<!-- /.table -->
							</div><!-- /.table-wrapper -->
						</div>
					</div>
				</div>
			</div><!-- /.row col-md-12 -->
		</div><!-- /.container -->
	</main><!-- /.wrap -->
	`,
	props: ['products'],
	methods: {
		productModified(payload) {
			this.$emit('product-modified', payload)
		}
	}
})