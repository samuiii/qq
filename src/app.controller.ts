import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { QueueDto } from './Models/QueueDto';

@Controller('/queue')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Param('startAt') startAt: Date = new Date(),
    @Param('endAt') endAt: Date = new Date(),
  ) {
    return this.appService.findAllQueueByDate(startAt, endAt);
  }

  @Post()
  getBruh(@Body() queueDto: QueueDto) {
    return this.appService.saveQueue(queueDto);
  }
}
