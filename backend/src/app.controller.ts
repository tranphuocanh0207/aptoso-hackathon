import { Controller, Get, Header, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('heathcheck')
@ApiTags('check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      code: 200,
      message: 'Good',
      data: this.appService.getHello(),
    };
  }
}
