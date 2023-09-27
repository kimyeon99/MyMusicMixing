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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1214',
      database: 'MMM',
      entities: [Music, Playlist],
      migrations: ['src/migration/*.ts'],
      synchronize: false,
    }),
    MusicModule, PlaylistModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
