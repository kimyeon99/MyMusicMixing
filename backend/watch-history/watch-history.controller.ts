import { Controller, Get, Post, Delete, Param, ParseIntPipe, Body, Query } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';

@Controller('watch-history')
export class WatchHistoryController {
    constructor(private readonly watchHistoryService: WatchHistoryService) {}

    @Get(':userId')
    async getHistory(@Param('userId', ParseIntPipe) userId: number, @Query('getNumber', ParseIntPipe) getNumber: number) {
        return this.watchHistoryService.getHistory(userId, getNumber);
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
