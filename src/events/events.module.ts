import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsController } from './events.controller';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
  controllers: [EventsController],
})
export class EventsModule {}