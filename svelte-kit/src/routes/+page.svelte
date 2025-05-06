<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const startRecording = async () => {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
			alert('getUserMedia not supported on your browser!');
			return;
		}
		const stream = await navigator.mediaDevices.getDisplayMedia({
			audio: {
				autoGainControl: false,
				channelCount: 1,
				echoCancellation: false,
				noiseSuppression: false,
				sampleSize: 16
			}
		});
		const mediaRecorder = new MediaRecorder(stream);
		const audioChunks = new Array<Blob>();
		mediaRecorder.addEventListener('dataavailable', (event) => {
			audioChunks.push(event.data);
			data.socket?.emit('audio-data', event.data);
		});
		mediaRecorder.addEventListener('stop', () => {
			console.log('Recording stopped');
		});
		mediaRecorder.start();
	};
</script>

<button onclick={startRecording}> Record Audio </button>
