import {Controller, Get} from '@nestjs/common';
import {EventsGateway} from "./events.gateway";

@Controller('api/chat')
export class EventsController {
    constructor(
        private readonly eventsGateway: EventsGateway
    ) {}

    @Get('/')
    async broadcastToClients() {
        this.eventsGateway.server.emit('triggerRest', null);
        return 1;
    }
}