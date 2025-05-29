import { Module } from '@nestjs/common';
import { MeliController } from './meli.controller';
import { ConfigModule } from '@nestjs/config';
import { MeliApiService } from './meli-api.service';
import { MeliAuthService } from './meli-auth.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot(), AuthModule],
  controllers: [MeliController],
  providers: [MeliApiService, MeliAuthService, AuthGuard],
})
export class MeliModule {}
