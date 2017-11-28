var tableRow = Vue.component('product-row', {
	template: `
		<tr>
			<td>{{ item._id }}</td>
			<td><img class="small-thumbnail" v-bind:src="item.image" alt="Pic"/></td>
			<td>{{ item.name }}</td>
			<td>{{ item.price }}</td>
			<td>{{ item.quantity }}</td>
			<td>{{ item.category }}</td>
			<td>
				<a href="#" class="btn btn-warning btn-edit"><i class="fa fa-cog"></i> Ubah</a>
				<a href="#" class="btn btn-danger btn-edit"><i class="fa fa-times-circle"></i> Hapus</a>
			</td>
		</tr>
	`,
	props: ['item', 'index']
});