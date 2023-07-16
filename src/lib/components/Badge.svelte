<script lang="ts">
	export let content: string | null;
</script>

{#if !!content}
	<span
		class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary-dark/30"
	>
		{content}
	</span>
{/if}
