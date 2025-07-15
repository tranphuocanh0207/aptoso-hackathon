import { Module } from '@nestjs/common';
import { UserModule } from './user/route.module';
import { AuthModule } from './auth/auth.module';
import { OauthModule } from './oauth/oauth.module';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [UserModule, AuthModule, OauthModule, CampaignModule],
})
export class CoreModule {}
