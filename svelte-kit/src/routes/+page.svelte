<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import Button from '$lib/components/button.svelte';

	let { data }: PageProps = $props();

	let recorder = $state<MediaRecorder | null>(null);
	let isMobile = $state(false);
	let inputType = $state<'device' | 'mic'>('device');

	$effect(() => {
		inputType = isMobile ? 'mic' : 'device';
	});

	const startRecording = async () => {
		const constraints: MediaStreamConstraints = {
			audio: {
				autoGainControl: false,
				echoCancellation: false,
				noiseSuppression: false,
				channelCount: 1,
				sampleSize: 16
			},
			video: false
		};

		const mediaDevice =
			inputType === 'mic'
				? navigator.mediaDevices.getUserMedia
				: navigator.mediaDevices.getDisplayMedia;

		const stream = await mediaDevice(constraints);
		const audioTracks = stream.getAudioTracks();
		const audioStream = new MediaStream(audioTracks);

		recorder = new MediaRecorder(audioStream, {
			mimeType: 'audio/wav',
			audioBitsPerSecond: 128_000,
			videoBitsPerSecond: 0
		});

		recorder.addEventListener('dataavailable', (event) => {
			data.socket?.emit('audio-data', event.data);
		});

		recorder.addEventListener('stop', () => {
			console.log('Recording stopped');
		});

		recorder.start(3_000);

		setTimeout(stopRecording, 15_000);
	};

	const stopRecording = () => {
		if (!recorder) return;
		recorder.stop();
		recorder.stream.getTracks().forEach((track) => track.stop());
	};

	onMount(() => {
		isMobile = !!(
			navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPhone|iPad|iPod/i)
		);

		return () => stopRecording();
	});
</script>

<Button onclick={startRecording} style="danger">Record Audio</Button>
