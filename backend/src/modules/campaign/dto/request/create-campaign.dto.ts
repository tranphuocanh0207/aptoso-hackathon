import { ApiProperty } from '@nestjs/swagger';
import {
  isBoolean,
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CampaignAction, CampaignType } from '../../entities/campaign.entity';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Shill Battle Quest', description: 'Campaign title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Join and help promote our new token!',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: CampaignType.POST_QUEST,
    enum: CampaignType,
  })
  @IsEnum(CampaignType)
  type: CampaignType;

  @ApiProperty({
    example: [CampaignAction.COMMENT, CampaignAction.LIKE],
    required: false,
  })
  actions: CampaignAction[];

  @ApiProperty({ example: 'x.com', required: true })
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty({ example: 'Aptos', required: false })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiProperty({ example: 'commentText', required: false })
  @IsOptional()
  @IsString()
  commentText?: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  numberOfPost?: number;

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber()
  minFollowers?: number;

  @ApiProperty({ example: 80, required: false })
  @IsOptional()
  @IsNumber()
  smartFollowersScore?: number;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  mustHoldMinToken?: number;

  @ApiProperty({ example: 7, required: false })
  @IsOptional()
  @IsNumber()
  mustHoldDurationDays?: number;

  @ApiProperty({ example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  totalTokenReward: number;

  @ApiProperty({ example: 50 })
  @IsNotEmpty()
  @IsNumber()
  rewardPerUser: number;

  @ApiProperty({ example: 200 })
  @IsNotEmpty()
  @IsNumber()
  maxParticipants: number;

  @ApiProperty({ example: 1751963015 })
  @IsNotEmpty()
  @IsNumber()
  startDate: number;

  @ApiProperty({ example: 1751963115 })
  @IsNotEmpty()
  @IsNumber()
  endDate: number;

  @ApiProperty({ example: 200 })
  @IsNotEmpty()
  @IsNumber()
  maxDailyJoin: number;

  @ApiProperty({
    example: 'https://example.com/banner.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  bannerImage?: string;

  @ApiProperty({ example: '0x1::aptos_coin::AptosCoin' })
  @IsNotEmpty()
  @IsString()
  tokenRewardAddress: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  depositReward: boolean;
}
