import { Controller, Get } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    @Get()
    async getAll() {
        return await this.musicService.getAll();
    }

}
