import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/entify/music.entity';
import { Playlist } from 'src/entify/playlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository<Playlist>,
        @InjectRepository(Music)
        private readonly musicRepository: Repository<Music>,
    ){}

    async createPlaylist(playlistName: string): Promise<any>{
        return this.playlistRepository.save({name: playlistName})
    }

    async addMusicToPlaylist(playlistId: number, musicId: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOne({ where: { id: playlistId }, relations: ['musics'] });
        const music = await this.musicRepository.findOne({ where: { id: musicId } });
      
        if (!playlist) {
          throw new Error(`Playlist with id ${playlistId} not found.`);
        }
      
        if (!playlist.musics) {
          playlist.musics = [];
        }
      
        playlist.musics.push(music);
        return this.playlistRepository.save(playlist);
      }
      
}
