import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: '사용자 실명' })
  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ description: '사용자 별명' })
  @Column()
  nickname: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @Column({ select: false, nullable: true, insert: false, update: false })
  postCount?: number;
}
