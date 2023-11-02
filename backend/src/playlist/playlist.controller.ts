import { Body, Controller, Get, Param, Patch, Post, } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist } from 'src/entify/playlist.entity';

export class CreatePlaylistDto {
    userId: number;
    currentPlaylist: PlaylistDto;
  }

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

    @Get(':playlistId/selected')
    async getSelectedPlaylistMusics(@Param('playlistId') playlistId: number): Promise<any>{
        return await this.playlistService.getSelectedPlaylistMusics(playlistId);
    }

    @Post('')
    async createUserPlaylist(@Body() createPlaylistDto: CreatePlaylistDto): Promise<any>{
        const { userId, currentPlaylist } = createPlaylistDto;
        await this.playlistService.createPlaylist(userId, currentPlaylist);
        return {message: "success"};
    }

    @Patch(':savePoint')
    async savePlaylist(@Param('savePoint') playlistId: number, @Body() currentPlaylist: PlaylistDto): Promise<any>{
        await this.playlistService.savePlaylist(playlistId, currentPlaylist);
        return {message: "success"};
    }

    
}
