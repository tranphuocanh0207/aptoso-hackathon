import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Wallet } from '../../entities/user.entity';

export abstract class UserResponseDto {
  @ApiProperty({})
  @IsString()
  _id?: any;

  @ApiProperty({
    example: '63ec8b0da0922523f9ab12ad', // Example of a MongoDB ObjectId
    description: 'The unique ID of the user',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'awesomeuser123',
    description: 'The unique username of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  wallet: Wallet;

  @ApiProperty({
    example: 'David Thompson',
    description: 'The full name of the user (optional)',
  })
  @IsString()
  fullName?: string;

  @ApiProperty({
    example: 'david.thompson@email.com',
    description: "The user's email address (optional, must be unique)",
  })
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'URL to the user avatar',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: 'Cover image URL',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is verified',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  verificationStatus?: boolean;

  @ApiProperty({
    example: 100,
    description: 'Number of followers',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  followers?: number;

  @ApiProperty({
    example: 150,
    description: 'Number of users this user is following',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  following?: number;

  @ApiProperty({
    example: 'https://mywebsite.com',
    description: 'External URL in profile',
    required: false,
  })
  @IsOptional()
  @IsString()
  externalUrl?: string;
}

export class UserListResponseDto {
  @ApiProperty({
    example: `[
            {
              "userId": "65e36d87d655e4cb2eb1eef4",
              "createdAt": 1709403527,
              "updatedAt": 1709403527,
              "isDeleted": false,
              "username": "awesomeuser1234",
              "role": "user",
              "avatar": "avatar"
            }
          ]`,
    description: `
         user
        `,
    type: UserResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  users: UserResponseDto[];

  @ApiProperty({
    example: 0,
    description: `
        page
        `,
  })
  page?: number;

  @ApiProperty({
    example: 1,
    description: `
        pageSize
        `,
  })
  pageSize?: number;

  @ApiProperty({
    example: 1,
    description: `
        totalPages
        `,
  })
  totalPages?: number;

  @ApiProperty({
    example: 1,
    description: `
        totalItems
        `,
  })
  totalItems?: number;
}

export class InternalUserResponseDto extends UserResponseDto {
  @ApiProperty({
    example: 'someHashedPassword',
    description: "The user's password (hashed)",
  })
  @IsString()
  password: string;
}

export class LoginUserResponseDto {
  @ApiProperty({
    example: '{}',
    description: `
         user
        `,
    type: UserResponseDto,
  })
  @IsObject()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @ApiProperty({
    example: 'access_token.twitter',
    description: `
        accessToken
        `,
  })
  accessToken: string;

  @ApiProperty({
    example: 'refresh_token',
    description: `
        refreshToken
        `,
  })
  refreshToken: string;

  @ApiProperty()
  isNew: boolean;
}


export class TokenBalanceResponseDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  name : string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  rawAmount: number;

  @ApiProperty()
  decimals : number;
}

export class TokenBalancesResponseDto {
  @ApiProperty({type : [TokenBalanceResponseDto]})
  @Type(() => TokenBalanceResponseDto)
  balances : TokenBalanceResponseDto[];
}

export class TransferTokenDto {
  @ApiProperty()
  tokenAddress: string;

  @ApiProperty()
  amount : number;

  @ApiProperty()
  receiver: string;
}


export class TransferTokenResponseDto {
  @ApiProperty()
  transactionHash: string;
}
