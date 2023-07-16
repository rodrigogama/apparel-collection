<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	import { formatCurrency } from '$lib/utils/currency';
	import type { Product } from '../../types/product';

	export let product: Product | null;
	export let open = false;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};
</script>

{#if open}
	<div class="relative" role="dialog" aria-modal="true">
		<div class="modalOverlay" />

		<div class="modalWrapper">
			<div class="modalContainer">
				<button
					on:click={handleClose}
					type="button"
					class="absolute right-8 top-8 text-gray-400 hover:text-gray-500"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<div class="flex w-full">
					<div class="overflow-hidden bg-gray-100">
						<img
							src={product?.assets.imageSrc ?? '/images/products/placeholder.png'}
							alt={product?.name}
							class="aspect-square object-cover object-center w-full h-full"
						/>
					</div>

					<div class="mx-8 w-full max-w-[312px] self-center">
						<div class="flex items-center justify-between gap-2 pb-4 separator">
							<p class="text-title">{product?.name}</p>
							<p class="text-title">
								{formatCurrency(product?.price ?? 0)}
							</p>
						</div>

						<p class="text-description separator py-8">
							{product?.description}
						</p>

						<p class="text-caption my-4">Product code {product?.code}</p>

						<button on:click type="button" class="btn btn-primary font-extrabold"
							>Add to cart</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.modalOverlay {
		@apply fixed inset-0 bg-gray-500 bg-opacity-75;
	}

	.modalWrapper {
		@apply fixed inset-0 z-10 overflow-y-auto flex items-center justify-center min-h-full text-center;
	}

	.modalContainer {
		@apply relative flex w-full text-left text-base h-full max-h-[648px] max-w-5xl bg-white rounded;
	}
</style>
