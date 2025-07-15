import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'awesomeuser123',
    description: 'Username of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'David123@',
    description: "The user's password",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
