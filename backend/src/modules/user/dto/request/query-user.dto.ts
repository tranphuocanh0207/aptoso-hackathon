import { PaginationParams } from '@common/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RequestUserQuery extends PaginationParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({ required: false })
  username: string;
}
