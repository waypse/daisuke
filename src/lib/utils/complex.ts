import type { Complex } from '$lib/types';

export class ComplexOperations {
	/**
	 * Add two complex numbers
	 */
	static add(a: Complex, b: Complex): Complex {
		return [a[0] + b[0], a[1] + b[1]];
	}

	/**
	 * Subtract two complex numbers
	 */
	static sub(a: Complex, b: Complex): Complex {
		return [a[0] - b[0], a[1] - b[1]];
	}

	/**
	 * Multiply two complex numbers
	 */
	static mul(a: Complex, b: Complex): Complex {
		return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
	}
}
