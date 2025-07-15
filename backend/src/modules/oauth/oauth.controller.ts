import { Controller, Get, Header, Req, Res, UseGuards } from '@nestjs/common';
import { TwitterOauthGuard } from './guards/twitter-oauth.guard';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

@Controller('oauth')
@ApiTags('Oauth')
export class OauthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitter')
  @UseGuards(TwitterOauthGuard)
  async twitterAuth(@Req() req) {
    // Guard redirects
  }

  @Get('twitter/callback')
  @UseGuards(TwitterOauthGuard)
  async twitterAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const userObject = JSON.parse(JSON.stringify(req['user']));
    // console.log('userObject:', userObject);
    const env = req['session'].oauthEnv;
    const rs = await this.authService.loginWithTwitter({
      id: userObject?.id,
      username: userObject?.username,
      displayName: userObject?.displayName,
      image: userObject?._json?.profile_image_url,
    });
    if (env == 'local') {
      return res.redirect(
        `http://localhost:3000?accessToken=${rs.accessToken}&refreshToken=${rs.refreshToken}`,
      );
    }

    if (env == 'dashboard') {
      return res.redirect(
        `https://aptoso-dashboard.vercel.app?accessToken=${rs.accessToken}&refreshToken=${rs.refreshToken}`,
      );
    }
    return res.redirect(
      `https://x.com/home?accessToken=${rs.accessToken}&refreshToken=${rs.refreshToken}`,
    );
  }
}
