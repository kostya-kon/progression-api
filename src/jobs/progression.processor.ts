import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Types } from 'src/classes/types.enum';
import { InputDto } from 'src/dto/input.dto';

@Processor('progression')
export class ProgressionProcessor {
  constructor(@InjectQueue('results') private resultQueue: Queue) {}
  private readonly logger = new Logger('Progression queue');
  @Process({
    concurrency: 10,
  })
  async handle(job: Job<InputDto>): Promise<number[]> {
    const { data: jobData, id } = job;
    const { type, data, number } = jobData;
    let result: number[];
    switch (type) {
      case Types.ARITHMETIC: {
        result = this.arithmeticProgression(data.start, data.common, number);
        break;
      }
      case Types.GEOMETRIC: {
        result = this.geometricProgression(data.start, data.common, number);
        break;
      }
      case Types.HARMONIC: {
        result = this.harmonicProgression(data.start, data.common, number);
        break;
      }
      case Types.FIBONACCI: {
        result = this.fibonacci(data.start, data.start2, number);
        break;
      }
      default: {
        this.logger.log(`Wrong type: ${type}`);
      }
    }
    this.resultQueue.add(result, { jobId: id });
    this.logger.log(`Result: ${result}`);
    return result;
  }

  arithmeticProgression(start, step, number): number[] {
    const result: number[] = [start];
    while (number--) {
      result.push((start += step));
    }
    return result;
  }

  geometricProgression(start, step, number): number[] {
    const result: number[] = [start];
    while (number--) {
      result.push((start *= step));
    }
    return result;
  }

  harmonicProgression(start, step, number): number[] {
    const result: number[] = [1 / start];
    while (number--) {
      result.push(1 / (start += step));
    }
    return result;
  }

  fibonacci(n1, n2, number): number[] {
    const result: number[] = [n1, n2];
    while (number--) {
      const next = n1 + n2;
      result.push(next);
      n1 = n2;
      n2 = next;
    }
    return result;
  }
}
