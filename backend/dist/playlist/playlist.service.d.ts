import { Music } from 'src/entify/music.entity';
import { Playlist } from 'src/entify/playlist.entity';
import { Repository } from 'typeorm';
export declare class PlaylistService {
    private readonly playlistRepository;
    private readonly musicRepository;
    constructor(playlistRepository: Repository<Playlist>, musicRepository: Repository<Music>);
    createPlaylist(playlistName: string): Promise<any>;
    addMusicToPlaylist(playlistId: number, musicId: number): Promise<Playlist>;
}
