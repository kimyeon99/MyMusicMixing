import { Playlist } from './playlist.entity';
export declare class Music {
    id: number;
    title: string;
    artist: string;
    url: string;
    view: number;
    playlists: Playlist[];
}
