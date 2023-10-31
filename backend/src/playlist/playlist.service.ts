import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/entify/music.entity';
import { Playlist } from 'src/entify/playlist.entity';
import { PlaylistItem } from 'src/entify/playlistItem.entity';
import { User } from 'src/entify/user.entify';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Music)
        private readonly musicRepository: Repository<Music>,
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository<Playlist>,
        @InjectRepository(PlaylistItem)
        private readonly playlistItemRepository: Repository<PlaylistItem>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
    ){}

    private logger: Logger = new Logger('AppGateway');

    async getByUserId(userId: number) {
      let playList;
      try{
        playList = await this.playlistRepository.find({
          where: { user: { id: userId } },
          relations: ['user']
        });
      }catch(err){
        return false;
      }
      this.logger.log('playlist:' + playList);
      return playList;
    }

    async createPlaylist(userId: number, currentPlaylist): Promise<any>{
      try{
      // Playlist 엔티티 생성
      const playlist = new Playlist();
      playlist.name = currentPlaylist.name;
      playlist.user = await this.userRepository.findOne({where:{id: userId}});  // User 엔티티 찾기
  
      // Playlist 저장
      const savedPlaylist = await this.playlistRepository.save(playlist);
  
      // PlaylistItem 생성 및 저장
      for (const item of currentPlaylist.currentMusics) {
          const playlistItem = new PlaylistItem();
          playlistItem.musicId = item.musicId;
          playlistItem.playlistId = currentPlaylist.currentIndex;
          await this.playlistItemRepository.save(playlistItem);  // PlaylistItem 저장
      }      
    }catch(err){
      console.error(err);
    }
 
  }
  

    // async addMusicToPlaylist(playlistId: number, musicId: number): Promise<Playlist> {
    //     const playlist = await this.playlistRepository.findOne({ where: { id: playlistId }, relations: ['musics'] });
    //     const music = await this.musicRepository.findOne({ where: { id: musicId } });
      
    //     if (!playlist) {
    //       throw new Error(`Playlist with id ${playlistId} not found.`);
    //     }
      
    //     if (!playlist.musics) {
    //       playlist.musics = [];
    //     }
      
    //     playlist.musics.push(music);
    //     return this.playlistRepository.save(playlist);
    //   }
      
}
