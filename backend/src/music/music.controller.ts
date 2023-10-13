import { Controller, Get, Post, Param } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    @Get()
    async getAll() {
        return await this.musicService.getAll();
    }

    @Get(':id')
    async getMusic(@Param('id') id: number) {
        return await this.musicService.getOne(id);
    }

    @Post(':id/increaseView')
    async increaseView(@Param('id') id:number) {
        return await this.musicService.increaseView(id);
    }

}
