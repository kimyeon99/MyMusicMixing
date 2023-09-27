import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { Music } from 'src/entify/music.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Playlist } from 'src/entify/playlist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Music, Playlist])],
    controllers: [MusicController],
    providers: [MusicService],
    exports: [MusicModule]
})
export class MusicModule {}
