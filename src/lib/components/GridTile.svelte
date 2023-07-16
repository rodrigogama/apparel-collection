<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let imageURL = '/images/products/placeholder.png';

	const dispatch = createEventDispatcher();
	let isHovering = false;
</script>

<div class="group border border-gray-200 rounded-xl">
	<button
		class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100 xl:aspect-h-8 xl:aspect-w-7 rounded-t-xl"
		on:mouseenter={() => {
			isHovering = true;
		}}
		on:mouseleave={() => {
			isHovering = false;
		}}
		type="button"
		on:click={() => dispatch('select')}
	>
		<img
			src={imageURL}
			alt=""
			class="h-full w-full object-cover object-center transition duration-300 ease-in-out"
			class:scale-110={isHovering}
		/>
	</button>
	<div class="p-4 flex justify-between">
		<div class="flex flex-col gap-2">
			<h3 class="text-caption text-base">
				<slot name="title" />
			</h3>

			<span class="uppercase">
				<slot name="promo" />
			</span>
		</div>
		<p class="text-title text-base">
			<slot name="price" />
		</p>
	</div>
</div>
