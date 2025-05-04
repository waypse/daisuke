<script lang="ts">
	import '$lib/css/reset.css';
	import '$lib/css/variables.css';
	import '$lib/css/typography.css';
	import type { LayoutProps } from './$types';
	// import io from 'socket.io-client';

	let { children }: LayoutProps = $props();

	// const socket = io('http://localhost:3000', {
	// 	autoConnect: false,
	// 	transports: ['websocket']
	// });

	// socket.on('connect', () => {
	// 	console.log('Connected to server');
	// });
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
</style>
