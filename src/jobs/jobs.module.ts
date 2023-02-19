import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ProgressionProcessor } from './progression.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'progression' }, { name: 'results' }),
  ],
  controllers: [],
  providers: [ProgressionProcessor],
})
export class JobsModule {}
