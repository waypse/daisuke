import { Server } from 'socket.io';
import type { ViteDevServer } from 'vite';
import events from './events.js';

export default () => ({
	name: 'socket.io',
	configureServer(server: ViteDevServer) {
		// create io server
		// @ts-ignore for some reason ViteDevServer isn't comptible type wise with SocketIO
		const io = new Server(server.httpServer);

		io.on('connection', (socket) => events(io, socket));
	}
});
