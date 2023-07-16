<script lang="ts">
	import type { Product } from '../../types/product';
	import type { PageData } from './$types';

	import GridTile from '$lib/components/GridTile.svelte';
	import ProductModal from '$lib/components/ProductModal.svelte';
	import Badge from '$lib/components/Badge.svelte';

	import { formatCurrency } from '$lib/utils/currency';
	import cartStore from '$lib/store/cart.store';
	import MasterPage from '$lib/components/MasterPage.svelte';

	export let data: PageData;

	let seletedProduct: Product | null = null;
	let isModalOpen = false;

	const handleSelectProduct = (product: Product) => {
		seletedProduct = product;
		isModalOpen = true;
	};

	const handleModalClose = () => {
		seletedProduct = null;
		isModalOpen = false;
	};

	const handleAddToCart = () => {
		if (!seletedProduct) return;

		cartStore.addToCart(seletedProduct);
	};
</script>

<MasterPage>
	<svelte:fragment slot="page-title">Product List</svelte:fragment>

	<div
		class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
	>
		{#each data.products as product}
			<GridTile imageURL={product.assets.imageSrc} on:select={() => handleSelectProduct(product)}>
				<svelte:fragment slot="title">
					{product.name}
				</svelte:fragment>
				<svelte:fragment slot="price">
					{formatCurrency(product.price)}
				</svelte:fragment>

				<span slot="promo">
					<Badge content={product.discountName} />
				</span>
			</GridTile>
		{/each}
	</div>
</MasterPage>

<ProductModal
	open={isModalOpen}
	product={seletedProduct}
	on:close={handleModalClose}
	on:click={handleAddToCart}
/>
