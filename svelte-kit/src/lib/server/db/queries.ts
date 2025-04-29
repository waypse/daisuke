import type { Couple } from '$lib/types';
import { db } from '.';
import { fingerprints, songs } from './schema';
import { eq, inArray, sql } from 'drizzle-orm';

export const storeFingerprints = async (
	fingerprintsMap: Map<number, Couple>
) => {
	const data = Array.from(
		fingerprintsMap,
		([address, { anchorTime, songId }]) => ({
			address,
			anchorTime,
			songId
		})
	);

	return await db
		.insert(fingerprints)
		.values(data)
		.onConflictDoUpdate({
			target: [
				fingerprints.address,
				fingerprints.songId,
				fingerprints.anchorTime
			],
			set: {
				address: sql.raw(`excluded.${fingerprints.address.name}`),
				songId: sql.raw(`excluded.${fingerprints.songId.name}`),
				anchorTime: sql.raw(`excluded.${fingerprints.anchorTime.name}`)
			}
		})
		.returning();
};

export const getCouples = async (addresses: number[]) => {
	const rows = await db.query.fingerprints.findMany({
		where: inArray(fingerprints.address, addresses)
	});

	const couples = new Map<number, Couple[]>();

	for (const row of rows) {
		if (!couples.has(row.address)) {
			couples.set(row.address, []);
		}

		couples.get(row.address)?.push({
			anchorTime: row.anchorTime,
			songId: row.songId
		});
	}

	return couples;
};

export const registerSong = async (
	title: string,
	artist: string,
	ytId: string
) => {
	const songKey = `${title}---${artist}`;

	return await db
		.insert(songs)
		.values({ artist, title, key: songKey, ytId })
		.onConflictDoNothing({ target: [songs.key], where: eq(songs.ytId, ytId) })
		.returning();
};

export const getSongByField = async (
	field: 'id' | 'ytId' | 'key',
	value: string | number
) => {
	const song = await db.query.songs.findFirst({
		where: eq(songs[field], value)
	});

	if (!song) {
		return { found: false, song: null };
	}

	return { found: true, song };
};

export const getSongById = (songId: number) => {
	return getSongByField('id', songId);
};

export const getSongByYtId = (ytId: string) => {
	return getSongByField('ytId', ytId);
};

export const getSongByKey = (key: string) => {
	return getSongByField('key', key);
};

export const deleteSong = async (songId: number) => {
	const result = await db.delete(songs).where(eq(songs.id, songId)).returning();

	if (result.length === 0) {
		return { found: false };
	}

	return { found: true, song: result[0] };
};
