import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { Playlist } from './playlist.entity';
  
  @Entity()
  export class PlaylistItem {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    musicId: number;
  
    // @ManyToOne(() => Playlist, (playlist) => playlist.playlistItems)
    // playlist: Playlist;

    @Column()
    playlistId: number;
  }
  