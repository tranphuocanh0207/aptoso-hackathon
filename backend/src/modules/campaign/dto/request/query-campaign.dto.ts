import { PaginationParams } from '@common/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CampaignStatus, CampaignType } from '../../entities/campaign.entity';

export class RequestCampaignQuery extends PaginationParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    required: false,
    enum: CampaignType,
    // default: CampaignType.FEED_QUEST,
  })
  type: CampaignType;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    required: false,
    enum: CampaignStatus,
    // default: CampaignStatus.LIVE,
  })
  status: CampaignStatus;
}

export class RequestCampaignQueryForUser {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    required: false,
    enum: CampaignStatus,
    // default: CampaignStatus.LIVE,
  })
  status: CampaignStatus;
}

export class RequestCampaignParticipationQuery extends PaginationParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({ required: false })
  userId: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({ required: false })
  campaignId: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isClaimed?: boolean;
}
