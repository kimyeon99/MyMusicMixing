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

    /* getNumber: getNumber수만큼 get요청*/
    async getHistory(userId: number, getNumber: number): Promise<WatchHistory[]> {
      try{
        const result = await this.historyRepository
          .createQueryBuilder('watch_history')
          .leftJoinAndSelect('watch_history.music', 'music')  // music 정보를 가져오기 위한 조인
          .select([
            'music',  // music의 전체 정보를 선택
            'MAX(watch_history.createdAt) AS lastWatched',
            'COUNT(watch_history.musicId) AS count',
          ])
          .where('watch_history.userId = :userId', { userId })
          .groupBy('watch_history.musicId')
          .orderBy('lastWatched', 'ASC')
          .take(getNumber)
          .getRawMany();
        this.logger.log(result + '/' + typeof getNumber);
        return result;
      }
      catch(err){
        this.logger.log(err);
        return [];
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
