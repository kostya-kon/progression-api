import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Queue } from 'bull';
import { InputData } from './classes/input-data.class';
import { InputDto } from './dto/input.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('progression') private progressionQueue: Queue,
    @InjectQueue('results') private resultQueue: Queue,
  ) {}
  getHello(): string {
    return 'Progression API';
  }

  async getOutput(tiket: string): Promise<number[]> {
    const job = await this.progressionQueue.getJob(tiket);
    if (!job) {
      throw new NotFoundException(
        `No result with id ${tiket}. try one more time later.`,
      );
    }
    return job.returnvalue;
  }

  async getInProgress(): Promise<number[]> {
    const jobs = await this.progressionQueue.getActive();
    return Array.from(jobs, (v) => Number(v.id));
  }

  async createProgression(inputDto: InputDto): Promise<InputData> {
    const job = await this.progressionQueue.add({
      ...inputDto,
    });
    return { tiket: job.id } as InputData;
  }
}
