import { Controller, Get, Post, Param } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) { }

    @Get()
    async getAll() {
        return await this.musicService.getAll();
    }

    @Get('no')
    async getAllNoDelay() {
        return await this.musicService.getAllNoDelay();
    }

    @Post(':id/increaseView')
    async increaseView(@Param('id') id: number) {
        return await this.musicService.increaseView(id);
    }

    @Get('mostViewed')
    async getMostViewedMusicList() {
        return await this.musicService.getMostViewedMusicList();
    }

    @Get(':id/getOne')
    async getOne(@Param('id') id: number) {
        return await this.musicService.getOne(id);
    }

}