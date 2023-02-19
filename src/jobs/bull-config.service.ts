import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService) {}

  createSharedConfiguration(): BullModuleOptions | Promise<BullModuleOptions> {
    return {
      redis: {
        host: this.configService.get('redis.host'),
        port: this.configService.get('redis.port'),
        db: this.configService.get('redis.db'),
        password: this.configService.get('redis.password'),
        maxRetriesPerRequest: 3,
        retryStrategy: function (times) {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
      },
      defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 50,
      },
      prefix: this.configService.get('redis.keyPrefix'),
    };
  }
}
