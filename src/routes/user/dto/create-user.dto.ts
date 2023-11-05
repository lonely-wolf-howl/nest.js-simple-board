import {
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  nickname: string;

  // @IsIn(['MALE, FEMALE'])
  // gender: string;

  // @IsEmail()
  // email: string;

  // @IsPhoneNumber('KR')
  // phoneNumber: string;
}
