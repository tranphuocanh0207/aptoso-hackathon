import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
  ValidationPipe,
  Query,
  Put,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';

import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { Request } from 'express';
import { CreateCampaignDto } from './dto/request/create-campaign.dto';
import {
  RequestCampaignParticipationQuery,
  RequestCampaignQuery,
  RequestCampaignQueryForUser,
} from './dto/request/query-campaign.dto';
import { SwaggerCampaignListResponseDto } from './dto/response/swagger-response.dto';
import {
  ClaimRewardCampaignDto,
  DepositCampaignDto,
  UpdateCampaignParticipationDto,
} from './dto/request/update-campaign.dto';

@Controller('campaigns')
@ApiTags('Campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  async create(@Req() req: Request, @Body() dto: CreateCampaignDto) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 201,
      message: 'Create campaign successful',
      data: await this.campaignService.createCampaign(userObject.sub, dto),
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all campaigns',
    type: SwaggerCampaignListResponseDto,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: RequestCampaignQuery,
  ) {
    let { page, limit } = query;
    page = page ? +page : 0;
    limit = limit ? +limit : 10;
    return {
      code: 200,
      message: 'Get all campaigns successful',
      data: await this.campaignService.getCampaigns({
        page,
        limit,
        ...query,
      }),
    };
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateCampaignDto) {
  //   return this.campaignService.updateCampaign(id, dto);
  // }

  @Post('participation')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  async updateParticipation(
    @Req() req: Request,
    @Body() request: UpdateCampaignParticipationDto,
  ) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 200,
      message: 'Update successful',
      data: await this.campaignService.updateParticipation(
        userObject.sub,
        request,
      ),
    };
  }

  @Get('participation')
  @ApiOkResponse({
    description: 'Get all campaign participation',
  })
  async findAllParticipation(
    @Query(new ValidationPipe({ transform: true }))
    query: RequestCampaignParticipationQuery,
  ) {
    let { page, limit } = query;
    page = page ? +page : 0;
    limit = limit ? +limit : 10;
    return {
      code: 200,
      message: 'Get all campaigns successful',
      data: await this.campaignService.getCampaignParticipation({
        page,
        limit,
        ...query,
      }),
    };
  }

  @Get('/user/:campaignId')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    description: 'Get campaign by id response',
  })
  public async getCampaignParticipationByCampaignId(
    @Param('campaignId') campaignId: string,
    @Req() req: Request,
  ) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 200,
      message: 'Get campaign by id successful',
      data: await this.campaignService.getCampaignParticipationByCampaignId(
        userObject.sub,
        campaignId,
      ),
    };
  }

  @Get('/user')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    description: 'Get campaign response',
  })
  public async getAllCampaignParticipation(
    @Query(new ValidationPipe({ transform: true }))
    query: RequestCampaignQueryForUser,
    @Req() req: Request,
  ) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    return {
      code: 200,
      message: 'Get campaign successful',
      data: await this.campaignService.getAllCampaignParticipation(
        userObject.sub,
        query.status,
      ),
    };
  }

  @Post('depositReward')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  async depositReward(
    @Req() req: Request,
    @Body() request: DepositCampaignDto,
  ) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    console.log({ userObject });
    return {
      code: 200,
      message: 'Deposit reward successful',
      data: await this.campaignService.depositReward(
        userObject.sub,
        request.campaignId,
      ),
    };
  }

  @Post('claimReward')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  async claimReward(
    @Req() req: Request,
    @Body() request: ClaimRewardCampaignDto,
  ) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    console.log({ userObject });
    return {
      code: 200,
      message: 'claim reward successful',
      data: await this.campaignService.claimReward(
        userObject.sub,
        request.campaignId,
      ),
    };
  }
}
