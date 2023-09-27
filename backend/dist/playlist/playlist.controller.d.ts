import { PlaylistService } from './playlist.service';
export declare class PlaylistController {
    private readonly playlistService;
    constructor(playlistService: PlaylistService);
    addMusicToPlaylist(playlistId: number, musicId: number): Promise<any>;
}
