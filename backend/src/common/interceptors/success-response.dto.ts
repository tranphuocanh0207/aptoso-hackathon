import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({
    example: '200',
    description: 'System code',
  })
  @IsNotEmpty()
  @IsString()
  readonly code: number;

  @ApiProperty({
    example: `success`,
    description: 'Response message',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @ApiProperty()
  readonly data: T;

  @ApiProperty({
    example: `2023-05-02T14:11:23.634Z`,
    description: 'Time',
  })
  @IsNotEmpty()
  @IsString()
  readonly time: string;
}
