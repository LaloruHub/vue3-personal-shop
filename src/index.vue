<template>
	<div class="d-flex justify-content-center">
		<input
			type="search"
			class="col-lg-2 col-lg-offset-4 my-4"
			v-model="product"
			placeholder="Search" />
	</div>
	<div class="d-flex flex-row justify-content-around">
		<section v-for="product in searchProduct">
			<article class="d-flex flex-column align-items-center">
				<img
					:src="product.photo"
					:alt="product.name"
					width="250"
					height="150" />
				<div class="my-2 d-flex flex-row align-items-baseline">
					<h5>{{ product.name }} &nbsp;&nbsp;&nbsp;</h5>
					<h4>{{ product.price }} &euro;</h4>
				</div>
				<h4>Stock: {{ product.stock }}</h4>
				<button
					@click="addProductToBasket"
					:id="product.name">
					Añadir a la cesta
				</button>
			</article>
		</section>
	</div>
</template>

<script>
	export default {
		mounted() {
			localStorage.removeItem('basket');
		},
		data() {
			return {
				product: '',
				products: [
					{
						photo: '/public/multimedia/images/products/rayo-mcqueen.jpg',
						name: 'Rayo McQueen',
						price: 350,
						stock: 1,
					},
					{
						photo: '/public/multimedia/images/products/chick-hicks.jpg',
						name: 'Chick Hicks',
						price: 100,
						stock: 5,
					},
					{
						photo: '/public/multimedia/images/products/tom-mate.jpg',
						name: 'Tom Mate',
						price: 300,
						stock: 3,
					},
				],
				basket: [],
			};
		},
		methods: {
			addProductToBasket(e) {
				let productToAdd = e.target.id;
				this.products.forEach((element) => {
					if (element.name === productToAdd) {
						this.basket.push(productToAdd);
						localStorage.setItem('basket', JSON.stringify(this.basket));
						if (element.stock > 0) {
							element.stock--;
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Stock',
								text: 'Esta fuera de stock',
								// background: '#21605D',
								// color: 'white',
								// confirmButtonColor: '#339476',
							});
						}
					}
				});
			},
		},
		computed: {
			searchProduct() {
				return this.products.filter((elemento) =>
					elemento.name.toLowerCase().includes(this.product.toLowerCase())
				);
			},
		},
	};
</script>
