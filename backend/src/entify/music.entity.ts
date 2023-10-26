import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, IntegerType } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  url: string;

  @Column({ default: null })
  img: string;

  @Column({ default: 0 })
  view: number;

  @ManyToMany(() => Playlist, (playlist) => playlist.musics)
  playlists: Playlist[];
}
