import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './route.service';
import { UserController } from './route.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
