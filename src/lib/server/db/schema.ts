import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const songs = sqliteTable('songs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	artist: text('artist').notNull(),
	key: text('key').notNull().unique()
});

export const fingerprints = sqliteTable(
	'fingerprints',
	{
		address: integer('address').notNull(),
		songId: integer('songId').notNull(),
		anchorTime: integer('anchorTime').notNull()
	},
	(table) => [primaryKey({ columns: [table.address, table.songId, table.anchorTime] })]
);
