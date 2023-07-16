<script lang="ts">
	import CartEmptyState from '$lib/components/CartEmptyState.svelte';
	import MasterPage from '$lib/components/MasterPage.svelte';
	import QuantityUpdater from '$lib/components/QuantityUpdater.svelte';

	import cartStore from '$lib/store/cart.store';
	import { formatCurrency } from '$lib/utils/currency';

	const { cartItemsCount, cartItems, cartDiscounts, cartTotals, addToCart, removeFromCart } =
		cartStore;
</script>

<MasterPage>
	<svelte:fragment slot="page-title">Checkout</svelte:fragment>

	{#if $cartItemsCount > 0}
		<div class="w-full flex gap-8">
			<div class="w-full pt-10">
				<h3 class="text-title pb-4 separator">Your cart</h3>

				<table class="w-full mt-4 table-auto">
					<thead>
						<tr class="uppercase text-xxs font-normal text-body-secondary text-left">
							<th class="font-normal pt-4 pb-8 w-[40%]">Product details</th>
							<th class="font-normal pt-4 pb-8 w-[20%] text-center">Quantity</th>
							<th class="font-normal pt-4 pb-8 w-[20%] text-center">Price</th>
							<th class="font-normal pt-4 pb-8 w-[20%] text-center">Total</th>
						</tr>
					</thead>

					<tbody>
						{#each $cartItems as item}
							<tr>
								<td class="pb-8 flex items-center gap-x-4">
									<img
										src={item.assets.thumbSrc}
										alt={item.name}
										class="rounded border border-gray-300 w-16 h-16"
									/>

									<div class="flex flex-col">
										<p class="text-primary text-lg font-normal">{item.name}</p>
										<p class="text-body-secondary text-xs font-normal">Product code {item.code}</p>
									</div>
								</td>

								<td class="text-center pb-8">
									<QuantityUpdater
										quantity={item.quantity}
										on:increment={() => addToCart(item)}
										on:decrement={() => removeFromCart(item)}
									/>
								</td>

								<td class="text-center pb-8 text-base text-black font-normal"
									>{formatCurrency(item.price)}</td
								>

								<td class="text-center pb-8 text-base text-black font-normal"
									>{formatCurrency(item.price * item.quantity)}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="flex flex-col bg-gray-100 w-full max-w-xs px-8 py-10">
				<h3 class="text-title pb-4 separator">Cart total</h3>

				<div class="sectionText py-6 flex justify-between separator">
					<p>{$cartItemsCount} Items</p>
					<p>{formatCurrency($cartTotals.totalAmount)}</p>
				</div>

				{#if $cartDiscounts.length > 0}
					<div class="py-6 separator">
						<p class="uppercase text-xs text-gray-500 pb-4">discounts</p>

						<ul>
							{#each $cartDiscounts as discount}
								<li class="sectionText flex justify-between pb-2 last-of-type:pb-0">
									<p>
										{discount.description}
									</p>
									<p>
										{discount.totalAmount > 0
											? formatCurrency(-discount.totalAmount)
											: formatCurrency(discount.totalAmount)}
									</p>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="sectionText flex justify-between py-4">
					<p>Total to pay</p>
					<p>
						{formatCurrency($cartTotals.totalAmountWithDiscount)}
					</p>
				</div>

				<button type="button" class="btn btn-primary mt-auto">Checkout</button>

				<a class="font-medium text-center text-primary hover:text-primary/90 pt-4" href="/products">
					Continue shopping
					<span aria-hidden="true"> &rarr;</span>
				</a>
			</div>
		</div>
	{:else}
		<CartEmptyState />
	{/if}
</MasterPage>

<style lang="postcss">
	.sectionText {
		@apply font-normal text-body-primary text-[14px];
	}
</style>
