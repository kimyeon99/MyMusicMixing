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
        });
      }catch(err){
        return false;
      }
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
          playlistItem.musicId = item.id;
          playlistItem.playlistId = playlist.id;
          await this.playlistItemRepository.save(playlistItem);  // PlaylistItem 저장
      }      
    }catch(err){
      console.error(err);
    }
 
    }

    async savePlaylist(currentPlaylist, savePoint): Promise<any>{
      try{
          // 기존의 PlaylistItem 삭제
          const oldItems = await this.playlistItemRepository.find({where:{playlistId: savePoint}});
          if(oldItems.length > 0){
              for(const oldItem of oldItems){
                  await this.playlistItemRepository.delete(oldItem.id);
              }
          }
  
          // PlaylistItem 생성 및 저장
          for (const item of currentPlaylist.currentMusics) {
              const playlistItem = new PlaylistItem();
              playlistItem.musicId = item.id;
              playlistItem.playlistId = savePoint;
              await this.playlistItemRepository.save(playlistItem);  // PlaylistItem 저장
          }
      }catch(err){
          console.error(err);
      }
  }
  

    async getSelectedPlaylistMusics(playlist){
      const selectedPlaylistItems = await this.playlistItemRepository.find({ where:{playlistId: playlist.id }});
      this.logger.log(`selectedPlaylistItems`+ selectedPlaylistItems);
      const musicIds = selectedPlaylistItems.map(item => item.musicId); // musicId만 추출
      this.logger.log(`musicIds`+ musicIds);
      return musicIds;
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
