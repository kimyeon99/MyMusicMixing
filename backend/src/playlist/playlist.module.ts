import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/entify/playlist.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Music } from 'src/entify/music.entity';
import { Repository } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Playlist, Music, Repository<Music>])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
    exports: [PlaylistModule]
})
export class PlaylistModule {}