import { ResponseDto } from '@common/interceptors/success-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  CampaignsListResponseDto,
} from './campaign-response.dto';

export class SwaggerCampaignListResponseDto extends ResponseDto<CampaignsListResponseDto> {
  @ApiProperty({
    example: `{
    "campaigns": [
      {
        "campaignId": "686cd58735e2371a5ce57be8",
        "title": "Shill Battle Quest",
        "description": "Join and help promote our new token!",
        "type": "PostQuest",
        "status": "Pending",
        "minFollowers": 500,
        "smartFollowersScore": 80,
        "mustHoldMinToken": 100,
        "mustHoldDurationDays": 7,
        "totalTokenReward": 10000,
        "rewardPerUser": 50,
        "maxParticipants": 200,
        "maxDailyJoin": 200,
        "startDate": "1000",
        "endDate": "2000",
        "bannerImage": "https://example.com/banner.png",
        "createdAt": 1751963015,
        "updatedAt": 1751963015,
        "isDeleted": false,
        "tokenRewardAddress" : "0x1::aptos_coin::AptosCoin",
        "depositReward" : false,
      }
    ],
    "page": 0,
    "pageSize": 1,
    "totalPages": 1,
    "totalItems": 1
  }`,
    type: CampaignsListResponseDto,
  })
  readonly data: CampaignsListResponseDto;
}