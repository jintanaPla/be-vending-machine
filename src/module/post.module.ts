import { CacheModule, Module, Global } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controller/app.postcontroller';
import { EventsModule } from '../events/events.module';


@Module({
  imports: [EventsModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})

export class PostModule { }