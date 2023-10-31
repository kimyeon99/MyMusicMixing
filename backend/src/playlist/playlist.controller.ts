import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist } from 'src/entify/playlist.entity';

interface PlaylistDto {
    name: string;
    playlistItems: any[];  // playlistItems의 타입을 명확하게 알 수 없으므로 일단 any[]로 설정
}

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService){}

    @Post(':playlistId/:musicId')
    async addMusicToPlaylist(@Param('playlistId') playlistId: number, @Param('musicId') musicId: number): Promise<any>{
        // await this.playlistService.addMusicToPlaylist(playlistId, musicId);
        return {message: "success"};
    }

    @Get(':userId')
    async getUserPlaylist(@Param('userId') userId: number): Promise<any>{
        return await this.playlistService.getByUserId(userId);
    }

    @Post(':userId')
    async createUserPlaylist(@Param('userId') userId: number, @Body() currentPlaylist: PlaylistDto): Promise<any>{
        await this.playlistService.createPlaylist(userId, currentPlaylist);
        return {message: "success"};
    }
}
