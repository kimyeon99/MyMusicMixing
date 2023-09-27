"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const music_entity_1 = require("../entify/music.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require("fs");
let MusicService = class MusicService {
    constructor(musicRepository, entityManager) {
        this.musicRepository = musicRepository;
        this.entityManager = entityManager;
        this.logger = new common_1.Logger('AppGateway');
    }
    async uploadFiles(folderPath) {
        try {
            const files = fs.readdirSync(folderPath);
            await this.entityManager.transaction(async (transactionalEntityManager) => {
                for (const fileName of files) {
                    const musicFileEntity = new music_entity_1.Music();
                    const parts = fileName.split('-');
                    const artist = parts[0].trim();
                    const titleWithExtension = parts[1].trim();
                    const title = titleWithExtension.replace('.mp3', '');
                    musicFileEntity.title = title;
                    musicFileEntity.artist = artist;
                    const reNamedTitle = title.trim() + '.mp3';
                    const sanitizedFileName = reNamedTitle.replace(/[:\*\?"<>\| ]/g, '_');
                    musicFileEntity.url = '/musicFiles/' + sanitizedFileName;
                    await this.saveFiles(folderPath, '../frontend/public/musicFiles', fileName, sanitizedFileName);
                    await transactionalEntityManager.save(music_entity_1.Music, musicFileEntity);
                }
            });
        }
        catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    }
    async saveFiles(oldPath, newPath, beforeFileName, reNamedfileName) {
        const oldFilePath = oldPath + '/' + beforeFileName;
        const newFilePath = newPath + '/' + reNamedfileName;
        await fs.promises.copyFile(oldFilePath, newFilePath);
    }
    async getAll() {
        const musicList = await this.musicRepository.find();
        return musicList;
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(music_entity_1.Music)),
    __param(1, (0, typeorm_2.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager])
], MusicService);
//# sourceMappingURL=music.service.js.map