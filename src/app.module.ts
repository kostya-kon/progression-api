import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import redisConfig from './config/redis.config';
import { BullConfigService } from './jobs/bull-config.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [redisConfig],
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    BullModule.registerQueue({ name: 'progression' }, { name: 'results' }),
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
