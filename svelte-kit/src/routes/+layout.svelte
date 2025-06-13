<script lang="ts">
	import '$lib/css/reset.css';
	import '$lib/css/variables.css';
	import '$lib/css/typography.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--background);
	}
	:global(main > *) {
		color: var(--text);
	}
</style>
