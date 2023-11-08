import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import { Music } from './music.entity';

@Entity()
export class WatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Music, music => music.watchHistories)
  music: Music;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
