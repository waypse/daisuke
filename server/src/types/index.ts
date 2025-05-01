/**
 * [Complex number] type definition
 *
 * [real, imaginary]
 *
 * The complex number is represented as a tuple of two numbers:
 * - The first element is the real part.
 * - The second element is the imaginary part.
 *
 * This representation is used in the FFT (Fast Fourier Transform) algorithm
 */
export type Complex = [number, number]; // [real, imaginary]

export type Couple = {
  anchorTime: number;
  songId: number;
};

export type Peak = {
  time: number;
  frequency: Complex;
};
