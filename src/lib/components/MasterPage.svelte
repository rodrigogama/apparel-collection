<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<main class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<Navbar />

	{#if $$slots['page-title']}
		<h1 class="page-title mb-4">
			<slot name="page-title" />
		</h1>
	{/if}

	<slot />
</main>
