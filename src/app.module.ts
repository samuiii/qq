import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueSchema } from './Schema/QueueSchema';

@Module({
  imports: [
    //mongo url
    MongooseModule.forRoot('mongoUrl'),
    MongooseModule.forFeature([{ name: 'queue', schema: QueueSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
