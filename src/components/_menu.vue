<template>
	<h1 class="mx-5">LaloruStore</h1>
	<div
		id="shop"
		class="justify-content-end px-5 w-25 d-flex flex-row justify-content-evenly">
		<a @click="showLikes">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-heart"
				viewBox="0 0 16 16">
				<path
					d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
			</svg>
		</a>
		<a @click="showBasket">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-basket"
				viewBox="0 0 16 16">
				<path
					d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
			</svg>
		</a>

		<section
			v-if="cartShowHide"
			id="shopping-cart"
			class="p-4 d-flex flex-column">
			<button
				class="btn btn-outline-dark align-self-end col-2"
				@click="this.cartShowHide = !this.cartShowHide">
				X
			</button>
			<h2 class="align-self-center">Shopping cart</h2>
			<h4>Total: {{ toPay }}&euro;</h4>
			<div v-for="(item, i) in basket">
				<div
					:id="i"
					class="d-flex my-3">
					<img
						:src="item.photo"
						alt=""
						width="100" />
					<div class="d-flex flex-column mx-2">
						<p>{{ item.name }}</p>
						<p>{{ item.price }}&euro;</p>
						<p>amount: {{ item.amount }}</p>
					</div>
					<div id="controls">
						<button
							:id="item.name"
							@click="removeOneOfStock">
							-
						</button>
						<button
							:id="item.name"
							@click="addOneOfStock">
							+
						</button>
						<button
							:id="item.name"
							class="self-align-center shopping-cart-trash"
							@click="deleteItem">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-trash3"
								viewBox="0 0 16 16">
								<path
									d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		mounted() {},
		data() {
			return {
				basket: [],
				cartShowHide: false,
				toPay: 0,
			};
		},
		methods: {
			getLocalStorage() {
				setInterval(() => {
					this.basket = JSON.parse(localStorage.getItem('basket'));
					if (this.basket !== null) {
						this.toPay = 0;
						this.basket.map((element) => {
							this.toPay += element.price;
						});
					}
				});
			},
			showBasket() {
				this.getLocalStorage();
				this.cartShowHide = !this.cartShowHide;
			},
			showLikes() {},
			removeOneOfStock(e) {
				let itemToRemove = e.target;
				this.basket.map((element) => {
					if (element.name === itemToRemove.id) {
						if (element.amount > 1) {
							element.amount--;
							this.toPay = element.price * element.amount;
							localStorage.setItem('basket', JSON.stringify(this.basket));
						} else {
							Swal.fire({
								icon: 'error',
								title: "We're sorry",
								text: "If you don't want you can delete it",
								background: '#191919',
								color: 'white',
								confirmButtonColor: '#6b6b6b',
								confirmTextColor: 'black',
							});
						}
					}
				});
			},
			addOneOfStock(e) {
				let itemToAdd = e.target;
				this.basket.map((element) => {
					if (element.name === itemToAdd.id) {
						if (element.amount < element.stock) {
							element.amount++;
							this.toPay = element.price * element.amount;
							localStorage.setItem('basket', JSON.stringify(this.basket));
						} else {
							Swal.fire({
								icon: 'error',
								title: "We're sorry",
								text:
									'We only have ' +
									element.stock +
									' stock for ' +
									element.name,
								background: '#191919',
								color: 'white',
								confirmButtonColor: '#6b6b6b',
								confirmTextColor: 'black',
							});
						}
					}
				});
			},
			deleteItem(e) {
				let itemToDelete = e.target;
				console.log(itemToDelete.id);
				this.basket.splice(itemToDelete, 1);
				localStorage.setItem('basket', JSON.stringify(this.basket));
			},
		},
		computed: {},
	};
</script>
