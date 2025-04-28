import type { Complex } from '$lib/types';

export class ComplexOperations {
	/**
	 * Add two complex numbers
	 *
	 * (a + bi) + (c + di) = (a + c) + (b + d)i
	 */
	static add(a: Complex, b: Complex): Complex {
		const [realA, imagA] = a;
		const [realB, imagB] = b;
		return [realA + realB, imagA + imagB];
	}

	/**
	 * Subtract two complex numbers
	 *
	 * (a + bi) - (c + di) = (a - c) + (b - d)i
	 */
	static sub(a: Complex, b: Complex): Complex {
		const [realA, imagA] = a;
		const [realB, imagB] = b;
		return [realA - realB, imagA - imagB];
	}

	/**
	 * Multiply two complex numbers
	 *
	 * (a + bi)(c + di) = (ac - bd) + (ad + bc)i
	 */
	static mul(a: Complex, b: Complex): Complex {
		const [realA, imagA] = a;
		const [realB, imagB] = b;
		// prettier-ignore
		return [
			realA * realB - imagA * imagB,
			realA * imagB + imagA * realB
		];
	}

	/**
	 * Abs returns the absolute value (also called the modulus) of x.
	 *
	 * |a + bi| = sqrt(a^2 + b^2)
	 */
	static abs(a: Complex): number {
		const [real, imag] = a;
		return Math.sqrt(real ** 2 + imag ** 2);
	}
}
