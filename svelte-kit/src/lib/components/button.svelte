<!-- @component  -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: () => void;
		children: Snippet;
		style?: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary';
	}

	let { onclick = () => {}, children, style = 'primary' }: Props = $props();
</script>

<button {onclick} class={style}>
	{@render children?.()}
</button>

<style>
	button {
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	button.success {
		background-color: var(--success);
		color: white;
	}

	button.warning {
		background-color: var(--warning);
		color: white;
	}

	button.info {
		background-color: var(--info);
		color: white;
	}

	button.primary {
		background-color: var(--primary);
		color: white;
	}

	button.secondary {
		background-color: var(--secondary);
		color: white;
	}

	button.danger {
		background-color: var(--danger);
		color: white;
	}

	button:hover {
		opacity: 0.8;
	}

	button:active {
		transform: scale(0.98);
	}

	button:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--primary);
	}
</style>
