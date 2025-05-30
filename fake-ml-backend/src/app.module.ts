import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { MeliModule } from './meli/meli.module';
import { MeliApiService } from './meli/meli-api.service';
import { MeliAuthService } from './meli/meli-auth.service';
import { UserModule } from './user/user.module';
import mlConfig from './config/ml.config';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mlConfig, mongoConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.url') ?? process.env.MONGO_URI,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ReviewModule,
    MeliModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, MeliApiService, MeliAuthService],
})
export class AppModule {}
