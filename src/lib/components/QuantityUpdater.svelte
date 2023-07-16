<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let quantity = 0;

	const dispatch = createEventDispatcher();
</script>

<div class="flex items-center justify-center gap-x-1">
	<button class="button" type="button" on:click={() => dispatch('decrement')}>-</button>
	<input class="input" disabled value={quantity} />
	<button class="button" type="button" on:click={() => dispatch('increment')}>+</button>
</div>

<style lang="postcss">
	.button {
		@apply text-primary transition w-10 h-10 rounded border border-transparent text-center;
		@apply hover:border-gray-300;
	}

	.input {
		@apply w-10 h-10 border border-gray-300 rounded font-normal text-center text-[14px];
	}
</style>
