import type { Complex } from '$lib/types';

export class ComplexOperations {
	/**
	 * Add two complex numbers
	 *
	 * (a + bi) + (c + di) = (a + c) + (b + d)i
	 */
	static add([realA, imagA]: Complex, [realB, imagB]: Complex): Complex {
		return [realA + realB, imagA + imagB];
	}

	/**
	 * Subtract two complex numbers
	 *
	 * (a + bi) - (c + di) = (a - c) + (b - d)i
	 */
	static sub([realA, imagA]: Complex, [realB, imagB]: Complex): Complex {
		return [realA - realB, imagA - imagB];
	}

	/**
	 * Multiply two complex numbers
	 *
	 * (a + bi)(c + di) = (ac - bd) + (ad + bc)i
	 */
	static mul([realA, imagA]: Complex, [realB, imagB]: Complex): Complex {
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
	static abs([real, imag]: Complex): number {
		return Math.sqrt(real ** 2 + imag ** 2);
	}
}
