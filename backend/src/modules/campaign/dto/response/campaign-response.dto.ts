import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  CampaignAction,
  CampaignStatus,
  CampaignType,
} from '../../entities/campaign.entity';
import { Type } from 'class-transformer';

export class CampaignResponseDto {
  @ApiProperty({})
  @IsString()
  _id?: any;

  @ApiProperty({
    example: 'cmp_001',
    description: 'Unique ID of the campaign',
  })
  @IsString()
  campaignId: string;

  @ApiProperty({
    example: 'Shill Battle Quest',
    description: 'Title of the campaign',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Join and help promote our new token!',
    description: 'Description of the campaign',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: CampaignType.POST_QUEST,
    enum: CampaignType,
    description: 'Type of campaign',
  })
  @IsEnum(CampaignType)
  type: CampaignType;

  @ApiProperty({
    example: CampaignStatus.LIVE,
    enum: CampaignStatus,
    description: 'Current status of the campaign',
  })
  @IsEnum(CampaignStatus)
  status: CampaignStatus;

  @ApiProperty({
    example: CampaignAction.COMMENT,
    description: 'Current action of the campaign',
  })
  @IsIn([CampaignAction])
  actions: CampaignAction[];

  @ApiProperty({
    example: 'user_123',
    description: 'User ID of the campaign creator',
  })
  @IsString()
  createdByUserId: string;

  @ApiProperty({
    example: 'https://x.com/',
    description: 'Link for campaign',
  })
  @IsString()
  link: string;

  @ApiProperty({
    example: 500,
    description: 'Minimum required followers to join',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  minFollowers?: number;

  @ApiProperty({
    example: 80,
    description: 'Minimum smart follower score',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  smartFollowersScore?: number;

  @ApiProperty({
    example: 100,
    description: 'Minimum number of tokens user must hold',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  mustHoldMinToken?: number;

  @ApiProperty({
    example: 7,
    description: 'Number of days tokens must be held',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  mustHoldDurationDays?: number;

  @ApiProperty({
    example: 10000,
    description: 'Total amount of tokens allocated to the campaign',
  })
  @IsNumber()
  totalTokenReward: number;

  @ApiProperty({
    example: 50,
    description: 'Token reward per user',
  })
  @IsNumber()
  rewardPerUser: number;

  @ApiProperty({
    example: 200,
    description: 'Maximum number of participants',
  })
  @IsNumber()
  maxParticipants: number;

  @ApiProperty({
    example: 20,
    description: 'Maximum users allowed to join per day',
  })
  @IsNumber()
  maxDailyJoin: number;

  @ApiProperty({
    example: 1752105600,
    description: 'Start date of campaign (timestamp)',
  })
  @IsNumber()
  startDate: number;

  @ApiProperty({
    example: 1752796800,
    description: 'End date of campaign (timestamp)',
  })
  @IsNumber()
  endDate: number;

  @ApiProperty({
    example: 80,
    description: 'Number of users who have joined',
  })
  @IsNumber()
  totalJoined: number;

  @ApiProperty({
    example: 60,
    description: 'Number of users who completed the campaign tasks',
  })
  @IsNumber()
  totalCompleted: number;

  @ApiProperty({
    example: 3000,
    description: 'Total tokens distributed so far',
  })
  @IsNumber()
  totalTokenDistributed: number;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    description: 'Optional banner image for campaign',
    required: false,
  })
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @ApiProperty({
    example: '0x1::aptos_coin::AptosCoin',
    description: 'tokenRewardAddress',
  })
  @IsString()
  tokenRewardAddress: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  depositReward: boolean;
}

export class CampaignsListResponseDto {
  @ApiProperty({
    example: `[

          ]`,
    description: `
         campaigns
        `,
    type: CampaignResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CampaignResponseDto)
  campaigns: CampaignResponseDto[];

  @ApiProperty()
  overview?: any;

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
