import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  userId: number;

  @ApiProperty({ description: '게시물 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '게시물 내용' })
  @Column()
  content: string;

  @ApiProperty({ description: '게시물 생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '게시물 수정일' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '사용자 정보' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
