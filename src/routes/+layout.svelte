<script lang="ts">
	import type { LayoutProps } from './$types';
	import { onMount, setContext } from 'svelte';
	import io, { Socket } from 'socket.io-client';

	let { children }: LayoutProps = $props();

	let socket = $state<Socket>();

	onMount(() => {
		socket = io();
		setContext('socket', socket);
	});
</script>

{@render children()}
