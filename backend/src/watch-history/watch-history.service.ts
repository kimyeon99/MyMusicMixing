import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/entify/music.entity';
import { WatchHistory } from 'src/entify/watchHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchHistoryService {
    constructor(
        @InjectRepository(WatchHistory)
        private readonly historyRepository: Repository<WatchHistory>,
        @InjectRepository(Music)
        private readonly musicRepository: Repository<Music>,
    ){}

    private logger: Logger = new Logger('AppGateway');

    async getHistory(userId: number): Promise<WatchHistory[]> {
        try {
          const history = await this.historyRepository.find({
            where: { userId: userId },
            relations: ["music"]  // "music"은 WatchHistory 엔티티에서 musicId에 연결된 음악 엔티티를 참조하는 필드명이어야 합니다.
          });
          this.logger.log('history' + history);
          return history;
        } catch (error) {
          console.error(`getHistory${error}`);
        }
      }
      

    async addHistory(musicId: number, userId: number): Promise<WatchHistory> {
        const music = await this.musicRepository.findOne({where:{id: musicId}});

        
        if (!music) {
          throw new NotFoundException(`Music with ID ${musicId} not found`);
        }
      
        const newHistory = new WatchHistory();
        newHistory.music = music;
        newHistory.userId = userId;
      
        return this.historyRepository.save(newHistory);
    }
      

    async deleteHistory(musicId: number, userId: number): Promise<void> {
        try {
            const history = await this.historyRepository.findOne({ where: { userId, music: { id: musicId } } });
            if (!history) {
                throw new NotFoundException(`History with userId ${userId} and musicId ${musicId} not found`);
            }
            await this.historyRepository.remove(history);
        } catch (error) {
            console.error(`deleteHistory${error}`);
        }
    }
    
}
