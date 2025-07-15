import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCampaignDto } from './create-campaign.dto';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CampaignAction } from '../../entities/campaign.entity';

export class UpdateCampaignDto {
  title?: string;
  description?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  maxParticipants?: number;
  rewardPerUser?: number;
  tokenRewardAddress?: string;
  depositReward? : boolean; 
}


export class DepositCampaignDto {
  @ApiProperty({ example: 'cmp_001' })
  @IsNotEmpty()
  @IsString()
  campaignId: string;
}


export class ClaimRewardCampaignDto {
  @ApiProperty({ example: 'cmp_001' })
  @IsNotEmpty()
  @IsString()
  campaignId: string;
}

export class UpdateCampaignParticipationDto {
  @ApiProperty({ example: 'cmp_001' })
  @IsNotEmpty()
  @IsString()
  campaignId: string;

  @ApiProperty({
    example: [CampaignAction.COMMENT],
    required: false,
    description: 'List of completed actions by user',
    enum: CampaignAction,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  completedAction?: CampaignAction[];

  @ApiProperty({ example: 1751963015, required: false })
  @IsOptional()
  @IsNumber()
  completedAt?: number;

  @ApiProperty({ example: '10', required: false })
  @IsOptional()
  @IsString()
  reward?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isClaimed?: boolean;

  @ApiProperty({ example: '0x0000', required: false })
  @IsOptional()
  @IsString()
  txHash?: string;
}
