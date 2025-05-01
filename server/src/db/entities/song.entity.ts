import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fingerprint } from './fingerprint.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  ytId: string | null;

  @Column({ unique: true })
  key: string;

  @OneToMany(() => Fingerprint, (fingerprint) => fingerprint.song)
  fingerprints: Fingerprint[];
}
