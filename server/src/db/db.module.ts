import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Fingerprint } from './entities/fingerprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Fingerprint])],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
