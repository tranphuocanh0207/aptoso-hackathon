import { ResponseDto } from '@common/interceptors/success-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  LoginUserResponseDto,
  TokenBalancesResponseDto,
  TransferTokenResponseDto,
  UserListResponseDto,
  UserResponseDto,
} from './user-response.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class SwaggerUserResponseDto extends ResponseDto<UserResponseDto> {
  @ApiProperty({
    example: `{
        "userId": "686a45062640da3933a9c72c",
        "username": "james",
        "email": "james@email.com",
        "createdAt": 1751794950,
        "updatedAt": 1751794950,
        "isDeleted": false
      }`,
    type: UserResponseDto,
  })
  readonly data: UserResponseDto;
}

export class SwaggerTokenBalancesResponseDto extends ResponseDto<TokenBalancesResponseDto> {
  @ApiProperty({
    example: `{
    "balances": [
      {
        "address": "0x1::aptos_coin::AptosCoin",
        "name": "Aptos Coin",
        "symbol": "APT",
        "decimals": 8,
        "rawAmount": 998594
      },
      {
        "address": "0x2ebb2ccac5e027a87fa0e2e5f656a3a4238d6a48d93ec9b610d570fc0aa0df12",
        "name": "CELLANA",
        "symbol": "CELL",
        "decimals": 8,
        "rawAmount": 6536902148
      }
    ]
  }`,
    type: TokenBalancesResponseDto,
  })
  readonly data: TokenBalancesResponseDto;
}


export class SwaggerTransferTokenResponseDto extends ResponseDto<TransferTokenResponseDto> {
  @ApiProperty({
    example: `{
    "transactionHash": "0xeba58765ec0c88122fc5c1c4e3aab137e679a90e622e5c9ab0bc4e17898677a4"
  }`,
    type: TransferTokenResponseDto,
  })
  readonly data: TransferTokenResponseDto;
}

export class SwaggerUserListResponseDto extends ResponseDto<UserListResponseDto> {
  @ApiProperty({
    example: `{
        "users": [
          {
        "userId": "686a45062640da3933a9c72c",
        "username": "james",
        "email": "james@email.com",
        "createdAt": 1751794950,
        "updatedAt": 1751794950,
        "isDeleted": false
      }
        ],
        "page": 0,
        "pageSize": 1,
        "totalPages": 1,
        "totalItems": 1
      }`,
    type: UserListResponseDto,
  })
  readonly data: UserListResponseDto;
}

export class SwaggerCreateUserResponseDto extends ResponseDto<UserResponseDto> {
  @ApiProperty({
    example: '201',
    description: 'System code',
  })
  @IsNotEmpty()
  @IsString()
  readonly code: number;

  @ApiProperty({
    example: `Create user by admin successful`,
    description: 'Response message',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @ApiProperty({
    example: `{
              "username": "awesomeuser123b",
              "email": "david.thompson@email.com",
              "password": "David123@",
              "createdAt": 1709569827,
              "updatedAt": 1709569827,
              "isDeleted": false,
              "userId": "65e5f722c4363a928afc1168"
            }`,
    type: UserResponseDto,
  })
  readonly data: UserResponseDto;
}
