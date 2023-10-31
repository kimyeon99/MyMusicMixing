import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { PlaylistItem } from './playlistItem.entity';
import { User } from './user.entify';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.playlists)
  user: User;

  // @OneToMany(() => PlaylistItem, (playlistItem) => playlistItem.playlist)
  // playlistItems: PlaylistItem[];
}
