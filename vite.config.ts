import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import socketPlugin from './src/lib/server/sockets/vite-plugin';

export default defineConfig({
	plugins: [sveltekit(), socketPlugin()],
	optimizeDeps: {
		exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
	}
});
