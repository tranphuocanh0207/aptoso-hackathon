import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TwitterOauthGuard extends AuthGuard('twitter') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const env = req.query.env;

    if (env) {
      req.session.oauthEnv = env;
    }

    const result = (await super.canActivate(context)) as boolean;
    return result;
  }
}
