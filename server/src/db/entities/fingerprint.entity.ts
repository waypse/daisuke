import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Song } from './song.entity';

@Entity('fingerprints')
export class Fingerprint {
  @PrimaryColumn()
  address: number;

  @PrimaryColumn()
  songId: number;

  @PrimaryColumn()
  anchorTime: number;

  @ManyToOne(() => Song)
  @JoinColumn({
    name: 'songId',
    referencedColumnName: 'id',
  })
  song: Song;
}
