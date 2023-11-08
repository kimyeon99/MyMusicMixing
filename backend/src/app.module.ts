import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicController } from './music/music.controller';
import { MusicService } from './music/music.service';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entify/music.entity';
import { PlaylistService } from './playlist/playlist.service';
import { PlaylistController } from './playlist/playlist.controller';
import { Playlist } from './entify/playlist.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User } from './entify/user.entify';
import { PlaylistItem } from './entify/playlistItem.entity';
import { WatchHistory } from './entify/watchHistory.entity';
import { WatchHistoryModule } from './watch-history/watch-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1214',
      database: 'MMM',
      entities: [Music, Playlist, PlaylistItem, User, WatchHistory],
      synchronize: false,
      migrations: ["src/migrations/*{.ts,.js}"], // migration 수행할 파일
    }),
    MusicModule, PlaylistModule, AuthModule, UserModule, WatchHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
