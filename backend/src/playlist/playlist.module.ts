import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/entify/playlist.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Music } from 'src/entify/music.entity';
import { Repository } from 'typeorm';
import { PlaylistItem } from 'src/entify/playlistItem.entity';
import { User } from 'src/entify/user.entify';

@Module({
    imports: [TypeOrmModule.forFeature([Playlist, PlaylistItem, User, Music, Repository<Music>])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
    exports: [PlaylistModule]
})
export class PlaylistModule {}