import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './route.service';
import { RequestUserQuery } from './dto/request/query-user.dto';
import {
  SwaggerCreateUserResponseDto,
  SwaggerTokenBalancesResponseDto,
  SwaggerTransferTokenResponseDto,
  SwaggerUserListResponseDto,
  SwaggerUserResponseDto,
} from './dto/response/swagger-response.dto';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { Request } from 'express';
import { TokenBalancesResponseDto, TransferTokenDto } from './dto/response/user-response.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOkResponse({
    description: 'Get all user response',
    type: SwaggerUserListResponseDto,
  })
  public async getAllUsers(
    @Query(new ValidationPipe({ transform: true })) query: RequestUserQuery,
  ) {
    // console.log('req:', req.user)
    let { page, limit } = query;
    page = page ? +page : 0;
    limit = limit ? +limit : 10;
    return {
      code: 200,
      message: 'Get all user successful',
      data: await this.userService.findAllUsers({
        page,
        limit,
        ...query,
      }),
    };
  }

  @Get(':userId')
  @ApiResponse({
    description: 'Get user by id response',
    type: SwaggerUserResponseDto,
  })
  public async getUserById(@Param('userId') userId: string) {
    return {
      code: 200,
      message: 'Get user by id successful',
      data: await this.userService.findByUserId(userId),
    };
  }

  @Get('profile/:username')
  @ApiResponse({
    description: 'Get profile user by username response',
    type: SwaggerUserResponseDto,
  })
  public async getProfileUserById(@Param('username') username: string) {
    return {
      code: 200,
      message: 'Get user by username successful',
      data: await this.userService.findProfileByUsername(username),
    };
  }

  @Get('my/profile')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    description: 'Get my profile response',
    type: SwaggerUserResponseDto,
  })
  @UseGuards(AccessTokenGuard)
  public async getMyProfile(@Req() req: Request) {
    // console.log('req:', req);
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 200,
      message: 'Get my profile successful',
      data: await this.userService.findProfileByUsername(userObject.username),
    };
  }

  @Get('wallet/tokenBalances')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    description: 'Get token balances response',
    type: SwaggerTokenBalancesResponseDto,
  })
  @UseGuards(AccessTokenGuard)
  public async getTokenBalances(@Req() req: Request) {
    // console.log('req:', req);
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 200,
      message: 'Get token balances successful',
      data: await this.userService.getTokenBalances(userObject.username),
    };
  }

  @Post('wallet/transferToken')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    description: 'transfer token',
    type: SwaggerTransferTokenResponseDto,
  })
  @UseGuards(AccessTokenGuard)
  public async transferToken(
    @Req() req: Request,
    @Body() request: TransferTokenDto,
  ) {
    // console.log('req:', req);
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 200,
      message: 'transfer token successful',
      data: await this.userService.transferToken(userObject.username, request),
    };
  }
}
