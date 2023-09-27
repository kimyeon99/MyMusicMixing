import { Controller, Param, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist } from 'src/entify/playlist.entity';

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService){}

    @Post(':playlistId/:musicId')
    async addMusicToPlaylist(@Param('playlistId') playlistId: number, @Param('musicId') musicId: number): Promise<any>{
        await this.playlistService.addMusicToPlaylist(playlistId, musicId);
        return {message: "success"};
    }
}
