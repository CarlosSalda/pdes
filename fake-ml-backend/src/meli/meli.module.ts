import { Module } from '@nestjs/common';
import { MeliController } from './meli.controller';
import { ConfigModule } from '@nestjs/config';
import { MeliApiService } from './meli-api.service';
import { MeliAuthService } from './meli-auth.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot()],
  controllers: [MeliController],
  providers: [MeliApiService, MeliAuthService],
})
export class MeliModule {}
