import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MusicService } from './music/music.service';
import * as express from 'express';
import { join } from 'path';
import { PlaylistService } from './playlist/playlist.service';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/static', express.static(join(__dirname, '..', 'public')));
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 도메인 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 필요한 경우 쿠키와 인증 정보를 전송
  });

  const musicService = app.get(MusicService);
  // await musicService.uploadFiles('../frontend/src/musics');

  const playlistService = app.get(PlaylistService);
  // await playlistService.createPlaylist("A");
  // await playlistService.createPlaylist("B");
  // await playlistService.createPlaylist("C");
  // await playlistService.addMusicToPlaylist(10, 3);
  // await playlistService.addMusicToPlaylist(10, 4);
  // await playlistService.addMusicToPlaylist(10, 5);
  // await playlistService.addMusicToPlaylist(10, 6);
  // await playlistService.addMusicToPlaylist(10, 7);
  // await playlistService.addMusicToPlaylist(11, 11);
  // await playlistService.addMusicToPlaylist(11, 12);
  // await playlistService.addMusicToPlaylist(11, 13);
  // await playlistService.addMusicToPlaylist(11, 14);
  // await playlistService.addMusicToPlaylist(12, 1);
  // await playlistService.addMusicToPlaylist(12, 2);



  await app.listen(4000);
}
bootstrap();
