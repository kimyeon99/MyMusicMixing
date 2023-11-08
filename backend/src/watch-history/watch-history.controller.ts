import { Controller, Get, Post, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';

@Controller('watch-history')
export class WatchHistoryController {
    constructor(private readonly watchHistoryService: WatchHistoryService) {}

    @Get(':userId')
    async getHistory(@Param('userId', ParseIntPipe) userId: number) {
        return this.watchHistoryService.getHistory(userId);
    }

    @Post(':userId/:musicId')
    async addHistory(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('musicId', ParseIntPipe) musicId: number,
    ) {
        return this.watchHistoryService.addHistory(musicId, userId);
    }

    @Delete(':userId/:musicId')
    async deleteHistory(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('musicId', ParseIntPipe) musicId: number,
    ) {
        return this.watchHistoryService.deleteHistory(musicId, userId);
    }
}
