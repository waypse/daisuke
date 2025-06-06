import { Complex } from 'src/types';
import { ComplexOperations } from './complex';

/**
 * FFT computes the Fast Fourier Transform (FFT) of the input data,
 * converting the signal from the time domain to the frequency domain.
 * For better understanding, refer to this video: https://www.youtube.com/watch?v=spUNpyF58BY
 */
export const transform = (input: number[]): Complex[] => {
  const complexArray: Complex[] = input.map((v) => [v, 0]);
  return recursiveFFT(complexArray);
};

/**
 * This function recursively computes the FFT of the input array of complex numbers.
 * @param complexArray - The input array of complex numbers.
 * @returns - The FFT of the input array.
 */
const recursiveFFT = (complexArray: Complex[]): Complex[] => {
  /** Number of samples that composed the signal */
  const windowSize = complexArray.length;
  if (windowSize <= 1) return complexArray;

  const even = recursiveFFT(complexArray.filter((_, i) => i % 2 === 0));
  const odd = recursiveFFT(complexArray.filter((_, i) => i % 2 !== 0));

  const result: Complex[] = new Array(windowSize);
  for (let k = 0; k < windowSize / 2; k++) {
    const angle = (-2 * Math.PI * k) / windowSize;
    const twiddle: Complex = [Math.cos(angle), Math.sin(angle)];
    const t = ComplexOperations.mul(twiddle, odd[k]);

    result[k] = ComplexOperations.add(even[k], t);
    result[k + windowSize / 2] = ComplexOperations.sub(even[k], t);
  }

  return result;
};
