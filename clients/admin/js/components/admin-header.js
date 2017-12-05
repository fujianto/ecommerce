Vue.component('admin-header', {
	template: `
	  <header class="admin-header">
			<div class="row">
				<div class="col-md-4">
					<h1 class="site-title"><a href="#">Admin Area</a></h1><!-- /.site-title -->
				</div><!-- /.col-md-4 -->

				<div class="col-md-8">
					<nav class="admin-menu">
						<ul>
							<li><p>Welcome, <span id="user-name">${localStorage.getItem('name')}</span></p></li>
							<li> | <a href="#" class="btn-logout"> Logout</a></li>
						</ul>
					</nav><!-- /.admin-menu -->
				</div><!-- /.col-md-8 -->
			</div><!-- /.row -->
		</header><!-- /.admin-header -->
	`
})

