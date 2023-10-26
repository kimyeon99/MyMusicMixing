import { Injectable, Logger } from '@nestjs/common';
import { Music } from 'src/entify/music.entity';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { identity } from 'rxjs';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) { }

  private logger: Logger = new Logger('AppGateway');

  // async uploadFiles(folderPath: string) {
  //   try {
  //     const files = fs.readdirSync(folderPath);

  //     await this.entityManager.transaction(async transactionalEntityManager => {
  //       for (const fileName of files) {
  //         // 파일 정보 생성 및 데이터베이스에 저장
  //         const musicFileEntity = new Music();
  //         const parts = fileName.split('-');
  //         const artist = parts[0].trim();
  //         const titleWithExtension = parts[1].trim();
  //         const title = titleWithExtension.replace('.mp3', ''); // ".mp3"를 제거한 제목만 저장

  //         musicFileEntity.title = title;
  //         musicFileEntity.artist = artist;

  //         // 파일 이름에서 공백과 특수문자를 언더스코어로 대체하여 URL을 설정합니다.
  //         const reNamedTitle = title.trim() + '.mp3';
  //         const sanitizedFileName = reNamedTitle.replace(/[:\*\?"<>\| ]/g, '_');
  //         musicFileEntity.url = '/musicFiles/' + sanitizedFileName;

  //         // 파일을 복사하고 저장합니다.
  //         await this.saveFiles(folderPath, '../frontend/public/musicFiles', fileName, sanitizedFileName);

  //         await transactionalEntityManager.save(Music, musicFileEntity);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error uploading files:', error);
  //     throw error;
  //   }
  // }

  // async saveFiles(oldPath, newPath, beforeFileName, reNamedfileName) {
  //   const oldFilePath = oldPath + '/' + beforeFileName;
  //   const newFilePath = newPath + '/' + reNamedfileName;

  //   await fs.promises.copyFile(oldFilePath, newFilePath);
  // }

  async getAll() {
    const musicList = await this.musicRepository.find();
    return musicList;
  }

  async increaseView(id: number) {
    const musicInfo = await this.musicRepository.findOne({ where: { id } });
    musicInfo.view++;
    await this.musicRepository.save(musicInfo);
    return musicInfo;
  }

  async getMostViewedMusicList() {
    const musicList = await this.musicRepository.find({
      select: ["img"],
      order: {
        view: "DESC"
      },
      take: 4
    });

    return musicList;
  }

  async getOne(id: number) {
    const musicInfo = await this.musicRepository.findOne({ where: { id } })
    this.logger.log(musicInfo);
    if (!musicInfo) {
      throw new Error('getOne: Music not found');
    }
    return musicInfo;
  }
}
