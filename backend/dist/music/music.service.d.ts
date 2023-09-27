import { Music } from 'src/entify/music.entity';
import { Repository, EntityManager } from 'typeorm';
export declare class MusicService {
    private readonly musicRepository;
    private readonly entityManager;
    constructor(musicRepository: Repository<Music>, entityManager: EntityManager);
    private logger;
    uploadFiles(folderPath: string): Promise<void>;
    saveFiles(oldPath: any, newPath: any, beforeFileName: any, reNamedfileName: any): Promise<void>;
    getAll(): Promise<Music[]>;
}
