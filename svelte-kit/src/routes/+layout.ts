import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import io, { Socket } from 'socket.io-client';

export const load = (async ({ url }) => {
	if (!browser) return { socket: null };

	const socket: Socket = io();

	return {
		socket
	};
}) satisfies LayoutLoad;
