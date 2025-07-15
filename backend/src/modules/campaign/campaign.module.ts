import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign, CampaignParticipation } from './entities/campaign.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Campaign, CampaignParticipation, User]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
