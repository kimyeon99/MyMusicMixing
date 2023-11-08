import { Module } from '@nestjs/common';
import { WatchHistoryController } from './watch-history.controller';
import { WatchHistoryService } from './watch-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchHistory } from 'src/entify/watchHistory.entity';
import { Repository } from 'typeorm';
import { Playlist } from 'src/entify/playlist.entity';
import { PlaylistItem } from 'src/entify/playlistItem.entity';
import { User } from 'src/entify/user.entify';
import { Music } from 'src/entify/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, PlaylistItem, User, Music, WatchHistory])],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService],
  exports: [WatchHistoryService]
})
export class WatchHistoryModule {}
