<script lang="ts">
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import io, { Socket } from 'socket.io-client';

	let { children }: LayoutProps = $props();

	let connected = $state(false);
	let socket = $state<Socket>();

	onMount(() => {
		socket = io();
		socket.on('connect', () => {
			connected = true;
		});
	});

	const sendMessage = () => {
		socket?.emit('message', 'Hello from SvelteKit!');
	};
</script>

<p>
	{connected ? 'Connected' : 'Disconnected'}
</p>

<button onclick={sendMessage}>send message</button>

{@render children()}
