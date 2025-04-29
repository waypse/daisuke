import type { Complex, Peak } from '$lib/types';
import { ComplexOperations, FFTProcessor } from '$lib/utils';

const DSP_RATIO = 4;
const FREQ_BIN_SIZE = 1024;
const MAX_FREQ = 5000.0; // 5kHz
const HOP_SIZE = FREQ_BIN_SIZE / 32;
const BANDS = [
	{ min: 0, max: 10 },
	{ min: 10, max: 20 },
	{ min: 20, max: 40 },
	{ min: 40, max: 80 },
	{ min: 80, max: 160 },
	{ min: 160, max: 512 }
];

/**
 * hammingWindow generates a Hamming window of the specified size.
 *
 * The Hamming window is defined as:
 *
 * w(n) = 0.54 - 0.46 * cos(2 * π * n / (N - 1))
 *
 * where N is the size of the window and n is the index.
 *
 * @returns The generated Hamming window as an array of numbers.
 */
const hammingWindow = (): number[] =>
	Array.from(
		{ length: FREQ_BIN_SIZE },
		(_, i) => 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (FREQ_BIN_SIZE - 1))
	);

/**
 * lowPassFilter is a first-order low-pass filter that attenuates high
 * frequencies above the cutoffFrequency.
 *
 * It uses the transfer function H(s) = 1 / (1 + sRC), where RC is the time constant.
 *
 * @param sampleRate - The sample rate of the input signal.
 * @param input  - The input signal to filter.
 * @returns  The filtered signal.
 */
const lowPassFilter = (sampleRate: number, input: number[]): number[] => {
	const rc = 1.0 / (2 * Math.PI * MAX_FREQ);
	const dt = 1.0 / sampleRate;
	const alpha = dt / (rc + dt);

	const filteredSignal: number[] = new Array(input.length);
	let prevOutput = 0;

	for (let i = 0; i < input.length; i++) {
		if (i === 0) {
			filteredSignal[i] = input[i] * alpha;
		} else {
			filteredSignal[i] = alpha * input[i] + (1 - alpha) * prevOutput;
		}
		prevOutput = filteredSignal[i];
	}
	return filteredSignal;
};

/**
 * downSample reduces the sample rate of the input signal by averaging
 * samples in blocks of size ratio.
 *
 * @param input - The input signal to down sample.
 * @param originalSampleRate - The original sample rate of the input signal.
 * @param targetSampleRate - The desired sample rate after down sampling.
 * @returns The down sampled signal.
 */
const downSample = (
	input: number[],
	originalSampleRate: number,
	targetSampleRate: number
): number[] => {
	if (targetSampleRate <= 0 || originalSampleRate <= 0) {
		throw new Error('Sample rates must be positive');
	}
	if (targetSampleRate > originalSampleRate) {
		throw new Error(
			'Target sample rate must be less than or equal to original sample rate'
		);
	}

	const ratio = Math.floor(originalSampleRate / targetSampleRate);
	if (ratio <= 0) {
		throw new Error('Invalid ratio calculated from sample rates');
	}

	const resampled: number[] = [];
	for (let i = 0; i < input.length; i += ratio) {
		const end = Math.min(i + ratio, input.length);
		let sum = 0;
		for (let j = i; j < end; j++) {
			sum += input[j];
		}
		const avg = sum / (end - i);
		resampled.push(avg);
	}

	return resampled;
};

/**
 *  getSpectrogram computes the spectrogram of the input signal using a
 *  short-time Fourier transform (STFT) with a Hamming window.
 *
 * @param samples - The input signal samples.
 * @param sampleRate - The sample rate of the input signal.
 * @returns The computed spectrogram as an array of complex numbers.
 */
const getSpectrogram = (samples: number[], sampleRate: number): Complex[][] => {
	// Step 1: Apply low-pass filter to remove frequencies above MAX_FREQ
	const filteredSample = lowPassFilter(sampleRate, samples);

	// Step 2: Down sample the filtered signal to reduce the sample rate
	// 4x down sampling
	const downSampledSample = downSample(
		filteredSample,
		sampleRate,
		sampleRate / DSP_RATIO
	);

	// Step 3: Calculate the number of windows for STFT
	// 1024 samples per window, 32 windows per hop
	const numOfWindows = Math.floor(
		downSampledSample.length / (FREQ_BIN_SIZE - HOP_SIZE)
	);
	const spectrogram: Complex[][] = [];

	const window = hammingWindow();

	// Step 4: Perform Short-Time Fourier Transform (STFT) over the signal
	for (let i = 0; i < numOfWindows; i++) {
		const start = i * HOP_SIZE;
		const end = Math.min(start + FREQ_BIN_SIZE, downSampledSample.length);
		const bin = new Array<number>(FREQ_BIN_SIZE).fill(0);

		for (let j = start; j < end; j++) {
			bin[j - start] = downSampledSample[j] * window[j - start];
		}

		const spectrum = FFTProcessor.transform(bin);
		spectrogram.push(spectrum);
	}

	return spectrogram;
};

// FIXME: might be wrong to recheck later
const extractPeaks = (
	spectrogram: Complex[][],
	audioDuration: number
): Peak[] => {
	if (spectrogram.length < 1) return [];

	const peaks: Peak[] = [];
	const binDuration = audioDuration / spectrogram.length;

	for (let binIdx = 0; binIdx < spectrogram.length; binIdx++) {
		const bin = spectrogram[binIdx];
		let maxMagSum = 0;

		const maxValues = BANDS.map((band) => {
			let maxMag = 0;
			let maxFreq: Complex = [0, 0];
			let freqIdx = band.min;

			for (let idx = band.min; idx < band.max && idx < bin.length; idx++) {
				const magnitude = ComplexOperations.abs(bin[idx]);

				if (magnitude > maxMag) {
					maxMag = magnitude;
					maxFreq = bin[idx];
					freqIdx = idx;
				}
			}

			maxMagSum += maxMag;
			return { maxMag, maxFreq, freqIdx };
		});

		// Calculate the average magnitude
		const avgMagnitude = maxMagSum / BANDS.length;

		// Add peaks that exceed the average magnitude
		for (let i = 0; i < maxValues.length; i++) {
			const { maxMag, maxFreq, freqIdx } = maxValues[i];
			if (maxMag > avgMagnitude) {
				const peakTimeInBin = (freqIdx * binDuration) / bin.length;
				const peakTime = binIdx * binDuration + peakTimeInBin;

				peaks.push({
					time: peakTime,
					frequency: maxFreq
				});
			}
		}
	}

	return peaks;
};

export { getSpectrogram, extractPeaks };
