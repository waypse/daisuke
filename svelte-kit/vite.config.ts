import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
	},
	mode: process.env.ENV === 'production' ? 'production' : 'development',
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true,
		// forced measures to make hmr work in docker
		// TODO: find a workaround without polling
		watch: {
			usePolling: true,
			interval: 1000
		}
	}
});
