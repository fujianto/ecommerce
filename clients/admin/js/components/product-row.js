var tableRow = Vue.component('product-row', {
	template: `
		<tr>
			<td>{{ item._id }}</td>
			<td><img class="small-thumbnail" v-bind:src="item.image" alt="Pic"/></td>
			<td>{{ item.name }}</td>
			<td>Rp. {{ formatRupiah(item.price) }}</td>
			<td>{{ item.quantity }}</td>
			<td>{{ item.category }}</td>
			<td>
				<a href="#" @click="editProduct()" class="btn btn-warning btn-edit" data-toggle="modal" data-target="#editProductModal"><i class="fa fa-cog"></i> Ubah</a>
				<a href="#" @click="deleteProduct()" class="btn btn-danger btn-edit"><i class="fa fa-times-circle"></i> Hapus</a>
			</td>
		</tr>
	`,
	props: ['item', 'index'],
	methods: {
		editProduct() {
			this.$emit('single-product-modified', { action: 'edit', index: this.index, product: this.item })
		},

		deleteProduct() {
			this.$emit('single-product-modified', { action: 'delete', index: this.index, product: this.item })
		},

		formatRupiah(angka) {
			var number_string = angka.toString(),
				sisa = number_string.length % 3,
				rupiah = number_string.substr(0, sisa),
				ribuan = number_string.substr(sisa).match(/\d{3}/g);

			if (ribuan) {
				separator = sisa ? '.' : '';
				rupiah += separator + ribuan.join('.');
			}

			return rupiah;
		},
	}
});