import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueueDto } from './Models/QueueDto';

@Injectable()
export class AppService {
  constructor(@InjectModel('queue') private readonly queueModel: Model<any>) {}

  async findAllQueueByDate(startAt: Date, endAt: Date) {
    const createAt = new Date(
      startAt.getFullYear(),
      startAt.getMonth(),
      startAt.getDate(),
      0,
      0,
      0,
    );
    const endCreateAt = new Date(
      endAt.getFullYear(),
      endAt.getMonth(),
      endAt.getDate(),
      23,
      59,
      59,
    );
    return await this.queueModel.find({
      createAt: { $gte: createAt },
      endCreateAt: { $lte: endCreateAt },
    });
  }

  async saveQueue(queueDto: QueueDto) {
    const queue = await this.queueModel.find({
      $or: [
        {
          createAt: { $lte: queueDto.createAt },
          endCreateAt: { $gte: queueDto.createAt },
        },
        {
          createAt: { $lte: queueDto.endCreateAt },
          endCreateAt: { $gte: queueDto.endCreateAt },
        },
        {
          createAt: { $gte: queueDto.createAt },
          endCreateAt: { $lte: queueDto.endCreateAt },
        },
      ],
    });

    if (queue.length > 0) {
      throw new BadRequestException('Unable to reserve the queue');
    }
    return await this.queueModel.create(queueDto);
  }
}
