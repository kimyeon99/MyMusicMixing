import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, IntegerType, OneToMany } from 'typeorm';
import { Playlist } from './playlist.entity';
import { WatchHistory } from './watchHistory.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;
  
  @Column({ default: null })
  img: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  view: number;

  @OneToMany(() => WatchHistory, watchHistory => watchHistory.music)
  watchHistories: WatchHistory[];

  // @ManyToMany(() => Playlist, (playlist) => playlist.musics)
  // playlists: Playlist[];
}
