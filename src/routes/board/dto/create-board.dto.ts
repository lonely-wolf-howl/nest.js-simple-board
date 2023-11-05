import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '게시물 작성자 고유번호',
    required: true,
  })
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '게시물 제목',
    required: true,
    example: '제목 예시입니다.',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '게시물 내용',
    required: true,
    example: '내용 예시입니다.',
  })
  content: string;
}
