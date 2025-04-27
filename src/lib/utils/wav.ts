import * as fs from 'node:fs/promises';
import { decoders } from 'audio-decode';

export const readWavFile = async (filePath: string): Promise<AudioBuffer> => {
	const fileBuffer = await fs.readFile(filePath);
	return decoders.wav(fileBuffer);
};
