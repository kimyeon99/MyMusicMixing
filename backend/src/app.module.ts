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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1214',
      database: 'MMM',
      entities: [Music, Playlist, User],
      synchronize: false,
      migrations: ["dist/migrations/*{.ts,.js}"], // migration 수행할 파일
      migrationsTableName: "migrations" // migration 내용이 기록될 테이블명(default = migration)
    }),
    MusicModule, PlaylistModule, AuthModule, UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
