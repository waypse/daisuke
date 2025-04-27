import type { Socket, Server } from 'socket.io';

export default (io: Server, socket: Socket) => {
	// Listen for a disconnect event
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

	socket.on('message', (data) => {
		console.log(`Received message from client: ${socket.id}`, data);
	});
};
