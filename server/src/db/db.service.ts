import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Fingerprint } from './entities/fingerprint.entity';
import { Song } from './entities/song.entity';
import { Couple } from '../types';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(Fingerprint)
    private readonly fingerprintRepository: Repository<Fingerprint>,
  ) {}

  async storeFingerprints(map: Map<number, Couple>) {
    const data = Array.from(map, ([address, { anchorTime, songId }]) => {
      const fingerprint = new Fingerprint();
      fingerprint.address = address;
      fingerprint.anchorTime = anchorTime;
      fingerprint.songId = songId;
      return fingerprint;
    });

    await this.fingerprintRepository.save(data);
  }

  async getCouples(addresses: number[]) {
    const rows = await this.fingerprintRepository.findBy({
      address: In(addresses),
    });

    const couples = new Map<number, Couple[]>();

    for (const { address, anchorTime, songId } of rows) {
      if (!couples.has(address)) {
        couples.set(address, []);
      }

      couples.get(address)?.push({ anchorTime, songId });
    }

    return couples;
  }

  async registerSong(title: string, artist: string, ytId: string) {
    const songKey = `${title}---${artist}`;

    let song = await this.songRepository.findOneBy({ key: songKey });

    if (!song) {
      song = new Song();
      song.key = songKey;
      song.title = title;
      song.artist = artist;
      song.ytId = ytId;
      song = await this.songRepository.save(song);
    }

    return song;
  }

  async getSongById(id: number) {
    return await this.songRepository.findOneBy({ id });
  }

  async getSongByKey(key: string) {
    return await this.songRepository.findOneBy({ key });
  }

  async getSongByYtId(ytId: string) {
    return await this.songRepository.findOneBy({ ytId });
  }

  async deleteSong(id: number) {
    const song = await this.songRepository.findOneBy({ id });

    if (!song) {
      return false;
    }

    await this.fingerprintRepository.delete({ songId: id });
    await this.songRepository.delete({ id });

    return true;
  }
}
