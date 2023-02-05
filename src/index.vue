<template>
	<div class="mt-5">
		<input
			type="search"
			class="col-2 col-offset-4 my-4 mx-5"
			v-model="product"
			placeholder="Search" />
	</div>
	<div class="container">
		<section v-for="product in searchProduct">
			<article class="mx-5 product d-flex flex-column align-items-start position-relative">
				<img
					:src="product.photo"
					:alt="product.name"
					width="250"
					height="150" />
				<div class="my-2 d-flex flex-column align-items-baseline">
					<h6 class="text-secondary">{{ product.name }} &nbsp;&nbsp;&nbsp;</h6>
					<h5 class="">{{ product.price }} &euro;</h5>
				</div>
				<h4>Stock: {{ product.stock }}</h4>
				<button
					@click="addProductToBasket"
					:id="product.name">
					Add to basket
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
						name: 'Lightning Mcqueen',
						price: 350,
						stock: 1,
						amount: 1,
					},
					{
						photo: '/public/multimedia/images/products/chick-hicks.jpg',
						name: 'Chick Hicks',
						price: 100,
						stock: 5,
						amount: 1,
					},
					{
						photo: '/public/multimedia/images/products/tom-mate.jpg',
						name: 'Tow Mater',
						price: 300,
						stock: 3,
						amount: 1,
					},
					{
						photo: '/public/multimedia/images/products/doc-hudson.jpg',
						name: 'Doc Hudson',
						price: 1050,
						stock: 0,
						amount: 1,
					},
				],
				basket: [],
			};
		},
		methods: {
			addProductToBasket(e) {
				let productToAdd = e.target;
				let added = '✔️';
				if (productToAdd.textContent !== added) {
					this.products.forEach((element) => {
						if (element.name === productToAdd.id) {
							//When the product is purchased
							//And is it still available in stock
							if (element.stock > 0) {
								this.basket.push(element);
								localStorage.setItem('basket', JSON.stringify(this.basket));
								productToAdd.textContent = added;
								productToAdd.style.backgroundColor = '#7a9f79';
							} else {
								Swal.fire({
									icon: 'error',
									title: "We're sorry",
									text: 'Out of stock',
									background: '#191919',
									color: 'white',
									confirmButtonColor: '#6b6b6b',
									confirmTextColor: 'black',
								});
							}
						}
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'On basket',
						text: 'Click on the shopping cart',
						background: '#191919',
						color: 'white',
						confirmButtonColor: '#6b6b6b',
						confirmTextColor: 'black',
					});
				}
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
