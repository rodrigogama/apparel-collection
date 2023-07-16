<script lang="ts">
	import cartStore from '$lib/store/cart.store';

	const { cartItemsCount } = cartStore;
</script>

<nav class="pb-16">
	<div class="flex h-16 items-center justify-between separator">
		<a href="/products" class="flex lg:ml-0">
			<img
				class="h-8 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=violet&amp;shade=700"
				alt=""
			/>
		</a>

		<a href="/checkout" class="group flex items-center p-2">
			<svg
				class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
				/>
			</svg>
			<span class="ml-2 text-caption font-medium group-hover:text-gray-800">
				{$cartItemsCount}
			</span>
		</a>
	</div>
</nav>
